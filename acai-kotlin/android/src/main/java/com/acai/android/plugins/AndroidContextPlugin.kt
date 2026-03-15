package com.acai.android.plugins

import android.content.pm.PackageManager
import android.os.Build
import com.acai.android.Configuration
import com.acai.core.Acai
import com.acai.core.events.BaseEvent
import com.acai.core.plugins.Plugin
import java.util.Locale
import java.util.UUID

/**
 * Automatically enriches events with Android device and app context.
 */
class AndroidContextPlugin : Plugin {
    override val type = Plugin.Type.BEFORE
    override lateinit var acai: Acai

    private var appVersion: String? = null
    private var deviceId: String? = null

    override fun setup(acai: Acai) {
        super.setup(acai)
        val androidConfig = acai.configuration as? Configuration ?: return
        val context = androidConfig.context

        try {
            val pm = context.packageManager
            val info = pm.getPackageInfo(context.packageName, 0)
            appVersion = info.versionName
        } catch (_: PackageManager.NameNotFoundException) {}

        // Generate or retrieve a stable device ID
        deviceId = getOrCreateDeviceId(androidConfig)
        if (acai.configuration.deviceId == null) {
            acai.setDeviceId(deviceId!!)
        }
    }

    override fun execute(event: BaseEvent): BaseEvent {
        val config = acai.configuration as? Configuration ?: return event
        val tracking = config.trackingOptions

        if (tracking.trackOsName && event.osName == null) event.osName = "android"
        if (tracking.trackOsVersion && event.osVersion == null) event.osVersion = Build.VERSION.RELEASE
        if (tracking.trackDeviceModel && event.deviceModel == null) event.deviceModel = Build.MODEL
        if (tracking.trackDeviceManufacturer && event.deviceManufacturer == null) event.deviceManufacturer = Build.MANUFACTURER
        if (tracking.trackVersionName && event.versionName == null) event.versionName = appVersion
        if (tracking.trackPlatform && event.platform == null) event.platform = "Android"
        if (tracking.trackLanguage && event.language == null) event.language = Locale.getDefault().language

        return event
    }

    private fun getOrCreateDeviceId(config: Configuration): String {
        val prefs = config.context.getSharedPreferences("acai_prefs", android.content.Context.MODE_PRIVATE)
        val key = "acai_device_id"
        return prefs.getString(key, null) ?: run {
            val newId = UUID.randomUUID().toString()
            prefs.edit().putString(key, newId).apply()
            newId
        }
    }
}
