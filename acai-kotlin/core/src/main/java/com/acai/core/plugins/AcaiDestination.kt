package com.acai.core.plugins

import com.acai.core.Acai
import com.acai.core.events.BaseEvent
import com.acai.core.utilities.HttpClient
import com.google.gson.Gson
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class AcaiDestination : DestinationPlugin() {

    override val type = Plugin.Type.DESTINATION
    override lateinit var acai: Acai

    private val eventQueue = mutableListOf<BaseEvent>()
    private val mutex = Mutex()
    private val gson = Gson()
    private lateinit var httpClient: HttpClient

    override fun setup(acai: Acai) {
        super.setup(acai)
        httpClient = HttpClient(acai.configuration)
    }

    override fun track(payload: BaseEvent): BaseEvent? {
        enqueue(payload)
        return payload
    }

    override fun identify(payload: com.acai.core.events.IdentifyEvent): com.acai.core.events.IdentifyEvent? {
        enqueue(payload)
        return payload
    }

    override fun groupIdentify(payload: com.acai.core.events.GroupIdentifyEvent): com.acai.core.events.GroupIdentifyEvent? {
        enqueue(payload)
        return payload
    }

    private fun enqueue(event: BaseEvent) {
        if (acai.configuration.optOut) return
        enrichEvent(event)
        synchronized(eventQueue) {
            eventQueue.add(event)
            if (eventQueue.size >= acai.configuration.flushQueueSize) {
                val toSend = eventQueue.toList()
                eventQueue.clear()
                sendEvents(toSend)
            }
        }
    }

    override suspend fun flush() {
        val toSend = synchronized(eventQueue) {
            val copy = eventQueue.toList()
            eventQueue.clear()
            copy
        }
        if (toSend.isNotEmpty()) {
            sendEvents(toSend)
        }
    }

    private fun enrichEvent(event: BaseEvent) {
        val config = acai.configuration
        if (event.userId == null) event.userId = config.userId
        if (event.deviceId == null) event.deviceId = config.deviceId
        if (event.timestamp == null) event.timestamp = System.currentTimeMillis()
        if (event.library == null) event.library = "acai-kotlin/${AcaiSDK.VERSION}"
    }

    private fun sendEvents(events: List<BaseEvent>) {
        try {
            val payload = buildPayload(events)
            val response = httpClient.post(payload)
            acai.configuration.logger.debug("Acai response: $response")
            events.forEach { event ->
                event.callback?.invoke(event, 200, "Success")
                acai.configuration.callback?.onResult(event, 200, "Success")
            }
        } catch (e: Exception) {
            acai.configuration.logger.error("Failed to send events: ${e.message}")
            events.forEach { event ->
                event.callback?.invoke(event, -1, e.message ?: "Unknown error")
                acai.configuration.callback?.onResult(event, -1, e.message ?: "Unknown error")
            }
        }
    }

    private fun buildPayload(events: List<BaseEvent>): String {
        val wrapper = mapOf(
            "api_key" to acai.configuration.apiKey,
            "events" to events,
            "options" to mapOf(
                "min_id_length" to acai.configuration.minIdLength
            ).filterValues { it != null }
        )
        return gson.toJson(wrapper)
    }
}

object AcaiSDK {
    const val VERSION = "1.0.0"
    const val LIBRARY_NAME = "acai-kotlin"
}
