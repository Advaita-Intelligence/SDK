package com.acai.core

import com.acai.core.utilities.AnalyticsLogger

/**
 * Configuration for the Acai SDK.
 *
 * @param apiKey Your Acai project API key (required)
 * @param serverUrl Override the default Acai server URL
 * @param serverZone Server zone to use (US or EU)
 * @param useBatch Send events via the batch API endpoint
 * @param flushQueueSize Number of events to queue before flushing
 * @param flushIntervalMillis Interval in ms between automatic flushes
 * @param maxRetries Maximum number of retry attempts for failed requests
 * @param logLevel Logging verbosity level
 * @param optOut If true, disables all event tracking
 */
open class Configuration(
    val apiKey: String,
    var serverUrl: String = AcaiServer.US.apiUrl,
    var serverZone: AcaiServer = AcaiServer.US,
    var useBatch: Boolean = false,
    var flushQueueSize: Int = 30,
    var flushIntervalMillis: Long = 30_000L,
    var maxRetries: Int = 5,
    var logLevel: LogLevel = LogLevel.WARN,
    var optOut: Boolean = false,
    var userId: String? = null,
    var deviceId: String? = null,
    var minIdLength: Int? = null,
    var partnerId: String? = null,
    var callback: EventCallBack? = null,
    var flushMaxRetries: Int = 5,
    var trackingOptions: TrackingOptions = TrackingOptions(),
) {
    val logger: AnalyticsLogger = AnalyticsLogger(logLevel)

    val effectiveServerUrl: String
        get() = if (useBatch) serverZone.batchUrl else serverUrl.ifBlank { serverZone.apiUrl }
}

enum class AcaiServer(val apiUrl: String, val batchUrl: String) {
    US(
        apiUrl = "https://api.acai.yourdomain.com/2/httpapi",
        batchUrl = "https://api.acai.yourdomain.com/batch"
    ),
    EU(
        apiUrl = "https://api.eu.acai.yourdomain.com/2/httpapi",
        batchUrl = "https://api.eu.acai.yourdomain.com/batch"
    );
}

enum class LogLevel { DISABLE, ERROR, WARN, DEBUG }

fun interface EventCallBack {
    fun onResult(event: com.acai.core.events.BaseEvent, code: Int, message: String)
}
