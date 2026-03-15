package com.acai.core

import com.acai.core.events.BaseEvent
import com.acai.core.plugins.Plugin
import java.util.concurrent.CopyOnWriteArrayList

/**
 * Timeline manages ordered plugin execution for every event.
 *
 * Plugins run in this order:
 *   BEFORE → ENRICHMENT → DESTINATION → AFTER
 */
class Timeline {

    private val before = CopyOnWriteArrayList<Plugin>()
    private val enrichment = CopyOnWriteArrayList<Plugin>()
    private val destination = CopyOnWriteArrayList<Plugin>()
    private val after = CopyOnWriteArrayList<Plugin>()

    fun add(plugin: Plugin) {
        when (plugin.type) {
            Plugin.Type.BEFORE -> before.add(plugin)
            Plugin.Type.ENRICHMENT -> enrichment.add(plugin)
            Plugin.Type.DESTINATION -> destination.add(plugin)
            Plugin.Type.AFTER -> after.add(plugin)
            Plugin.Type.UTILITY -> { /* Utility plugins are not in the timeline */ }
        }
    }

    fun remove(plugin: Plugin) {
        before.remove(plugin)
        enrichment.remove(plugin)
        destination.remove(plugin)
        after.remove(plugin)
    }

    fun process(event: BaseEvent): BaseEvent? {
        val afterBefore = applyPlugins(before, event) ?: return null
        val afterEnrichment = applyPlugins(enrichment, afterBefore) ?: return null
        applyPlugins(destination, afterEnrichment)
        applyPlugins(after, afterEnrichment)
        return afterEnrichment
    }

    fun applyClosure(closure: (Plugin) -> Unit) {
        (before + enrichment + destination + after).forEach(closure)
    }

    private fun applyPlugins(plugins: List<Plugin>, event: BaseEvent): BaseEvent? {
        var result: BaseEvent? = event
        for (plugin in plugins) {
            result = result?.let { plugin.execute(it) } ?: break
        }
        return result
    }
}
