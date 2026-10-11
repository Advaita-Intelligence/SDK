package com.acai.android.plugins

import android.app.Activity
import android.app.Application
import android.os.Bundle
import com.acai.android.Configuration
import com.acai.core.Acai
import com.acai.core.events.BaseEvent
import com.acai.core.plugins.Plugin

/**
 * Automatically tracks app lifecycle events (install, open, background, etc.)
 */
class AndroidLifecyclePlugin : Plugin, Application.ActivityLifecycleCallbacks {
    override val type = Plugin.Type.UTILITY
    override lateinit var acai: Acai

    private var sessionId = System.currentTimeMillis()
    private var foregroundActivityCount = 0

    override fun setup(acai: Acai) {
        super.setup(acai)
        val androidConfig = acai.configuration as? Configuration ?: return
        val app = androidConfig.context.applicationContext as? Application ?: return
        app.registerActivityLifecycleCallbacks(this)
    }

    override fun onActivityStarted(activity: Activity) {
        foregroundActivityCount++
        if (foregroundActivityCount == 1) {
            trackLifecycleEvent("App Opened")
        }
    }

    override fun onActivityStopped(activity: Activity) {
        foregroundActivityCount = maxOf(0, foregroundActivityCount - 1)
        if (foregroundActivityCount == 0) {
            trackLifecycleEvent("App Backgrounded")
            acai.flush()
        }
    }

    private fun trackLifecycleEvent(name: String) {
        val config = acai.configuration as? Configuration ?: return
        if (!config.defaultTracking.sessions) return

        val event = BaseEvent().apply {
            eventType = name
            sessionId = this@AndroidLifecyclePlugin.sessionId
        }
        acai.track(event)
    }

    // Unused callbacks
    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}
    override fun onActivityResumed(activity: Activity) {}
    override fun onActivityPaused(activity: Activity) {}
    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
    override fun onActivityDestroyed(activity: Activity) {}
    override fun execute(event: BaseEvent): BaseEvent = event
}
