package com.acai.android

import android.content.Context
import com.acai.core.Acai
import com.acai.android.plugins.AndroidContextPlugin
import com.acai.android.plugins.AndroidLifecyclePlugin
import com.acai.android.utilities.DeviceInfo

/**
 * Android-specific Acai SDK entry point.
 *
 * Usage:
 * ```kotlin
 * val acai = Acai(
 *     Configuration(
 *         apiKey = "YOUR_API_KEY",
 *         context = applicationContext
 *     )
 * )
 * acai.track("Button Clicked")
 * ```
 */
class Acai(configuration: Configuration) : com.acai.core.Acai(configuration) {

    private val androidConfig get() = configuration as Configuration

    override fun startup() {
        super.startup()
        add(AndroidContextPlugin())
        add(AndroidLifecyclePlugin())
    }

    companion object {
        @Volatile
        private var instance: Acai? = null

        /**
         * Get/create a singleton Acai instance.
         */
        fun getInstance(configuration: Configuration? = null): Acai {
            return instance ?: synchronized(this) {
                instance ?: run {
                    requireNotNull(configuration) {
                        "Configuration must be provided when creating the first Acai instance."
                    }
                    Acai(configuration).also { instance = it }
                }
            }
        }
    }
}
