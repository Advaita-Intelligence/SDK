package com.acai.core.plugins

import com.acai.core.Acai
import com.acai.core.events.BaseEvent

/**
 * Plugin interface for extending Acai SDK functionality.
 *
 * Plugins are applied in order within a [Timeline] and can enrich,
 * filter, or send events to a destination.
 */
interface Plugin {
    val type: Type
    var acai: Acai

    fun setup(acai: Acai) {
        this.acai = acai
    }

    fun execute(event: BaseEvent): BaseEvent? = event

    enum class Type {
        /** Runs before all other plugins. Use for enrichment or filtering. */
        BEFORE,
        /** Runs after BEFORE plugins. Primary enrichment stage. */
        ENRICHMENT,
        /** Sends events to a destination (e.g. Acai HTTP API). */
        DESTINATION,
        /** Runs after DESTINATION plugins. Good for logging and side effects. */
        AFTER,
        /** Utility plugin without event lifecycle. */
        UTILITY,
    }
}

/**
 * Convenience base class for event-modifying plugins.
 */
abstract class EventPlugin : Plugin {
    override lateinit var acai: Acai

    open fun track(payload: BaseEvent): BaseEvent? = payload
    open fun identify(payload: com.acai.core.events.IdentifyEvent): com.acai.core.events.IdentifyEvent? = payload
    open fun groupIdentify(payload: com.acai.core.events.GroupIdentifyEvent): com.acai.core.events.GroupIdentifyEvent? = payload

    override fun execute(event: BaseEvent): BaseEvent? {
        return when (event) {
            is com.acai.core.events.IdentifyEvent -> identify(event)
            is com.acai.core.events.GroupIdentifyEvent -> groupIdentify(event)
            else -> track(event)
        }
    }
}

/**
 * Destination plugin that sends events to an external service.
 */
abstract class DestinationPlugin : EventPlugin() {
    override val type = Plugin.Type.DESTINATION
    internal val timeline = com.acai.core.Timeline()

    fun add(plugin: Plugin): DestinationPlugin {
        timeline.add(plugin)
        return this
    }

    fun remove(plugin: Plugin): DestinationPlugin {
        timeline.remove(plugin)
        return this
    }

    override fun execute(event: BaseEvent): BaseEvent? {
        val enriched = timeline.process(event) ?: return null
        return super.execute(enriched)
    }

    open suspend fun flush() {}
}
