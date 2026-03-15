package com.acai.core

import com.acai.core.events.BaseEvent
import com.acai.core.events.EventOptions
import com.acai.core.events.GroupIdentifyEvent
import com.acai.core.events.IdentifyEvent
import com.acai.core.events.RevenueEvent
import com.acai.core.platform.EventBridge
import com.acai.core.plugins.AcaiDestination
import com.acai.core.plugins.Plugin
import com.acai.core.utilities.AnalyticsLogger
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

abstract class Acai(val configuration: Configuration) {

    val timeline = Timeline()
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    init {
        require(configuration.apiKey.isNotBlank()) { "API key must not be blank" }
        build()
    }

    private fun build() {
        add(AcaiDestination())
        startup()
    }

    protected open fun startup() {}

    fun track(
        eventType: String,
        eventProperties: Map<String, Any?>? = null,
        options: EventOptions? = null
    ) {
        val event = BaseEvent().apply {
            this.eventType = eventType
            this.eventProperties = eventProperties?.let { HashMap(it) }
            options?.let { mergeEventOptions(it) }
        }
        track(event)
    }

    fun track(event: BaseEvent) {
        scope.launch {
            timeline.process(event)
        }
    }

    fun identify(
        userId: String? = null,
        identify: Identify? = null,
        options: EventOptions? = null
    ) {
        userId?.let { setUserId(it) }
        val event = IdentifyEvent().apply {
            this.userProperties = identify?.properties
            options?.let { mergeEventOptions(it) }
        }
        track(event)
    }

    fun setGroup(
        groupType: String,
        groupName: String,
        options: EventOptions? = null
    ) {
        val event = BaseEvent().apply {
            this.eventType = "\$identify"
            this.groups = hashMapOf(groupType to groupName)
            options?.let { mergeEventOptions(it) }
        }
        track(event)
    }

    fun groupIdentify(
        groupType: String,
        groupName: String,
        identify: Identify,
        options: EventOptions? = null
    ) {
        val event = GroupIdentifyEvent().apply {
            this.groupType = groupType
            this.groupName = groupName
            this.groupProperties = identify.properties
            options?.let { mergeEventOptions(it) }
        }
        track(event)
    }

    fun revenue(revenue: Revenue, options: EventOptions? = null) {
        val event = RevenueEvent().apply {
            this.eventProperties = revenue.toEventProperties()
            options?.let { mergeEventOptions(it) }
        }
        track(event)
    }

    fun add(plugin: Plugin): Acai {
        plugin.setup(this)
        timeline.add(plugin)
        return this
    }

    fun remove(plugin: Plugin): Acai {
        timeline.remove(plugin)
        return this
    }

    fun flush() {
        scope.launch {
            timeline.applyClosure { plugin ->
                (plugin as? AcaiDestination)?.flush()
            }
        }
    }

    fun setUserId(userId: String) {
        configuration.userId = userId
    }

    fun setDeviceId(deviceId: String) {
        configuration.deviceId = deviceId
    }

    fun getUserId() = configuration.userId

    fun getDeviceId() = configuration.deviceId

    protected fun BaseEvent.mergeEventOptions(options: EventOptions) {
        options.userId?.let { userId = it }
        options.deviceId?.let { deviceId = it }
        options.timestamp?.let { timestamp = it }
        options.insertId?.let { insertId = it }
    }
}
