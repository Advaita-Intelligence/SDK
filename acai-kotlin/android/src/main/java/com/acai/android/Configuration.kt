package com.acai.android

import android.content.Context
import com.acai.core.AcaiServer
import com.acai.core.EventCallBack
import com.acai.core.LogLevel
import com.acai.core.TrackingOptions

/**
 * Android-specific configuration for Acai SDK.
 *
 * Extends [com.acai.core.Configuration] with Android context.
 */
class Configuration(
    apiKey: String,
    val context: Context,
    serverUrl: String = AcaiServer.US.apiUrl,
    serverZone: AcaiServer = AcaiServer.US,
    useBatch: Boolean = false,
    flushQueueSize: Int = 30,
    flushIntervalMillis: Long = 30_000L,
    maxRetries: Int = 5,
    logLevel: LogLevel = LogLevel.WARN,
    optOut: Boolean = false,
    userId: String? = null,
    deviceId: String? = null,
    minIdLength: Int? = null,
    partnerId: String? = null,
    callback: EventCallBack? = null,
    trackingOptions: TrackingOptions = TrackingOptions(),
    var trackingSessionEvents: Boolean = true,
    var defaultTracking: DefaultTrackingOptions = DefaultTrackingOptions(),
) : com.acai.core.Configuration(
    apiKey = apiKey,
    serverUrl = serverUrl,
    serverZone = serverZone,
    useBatch = useBatch,
    flushQueueSize = flushQueueSize,
    flushIntervalMillis = flushIntervalMillis,
    maxRetries = maxRetries,
    logLevel = logLevel,
    optOut = optOut,
    userId = userId,
    deviceId = deviceId,
    minIdLength = minIdLength,
    partnerId = partnerId,
    callback = callback,
    trackingOptions = trackingOptions,
)

data class DefaultTrackingOptions(
    val sessions: Boolean = true,
    val appLifecycles: Boolean = false,
    val deepLinks: Boolean = false,
    val screenViews: Boolean = false,
)
