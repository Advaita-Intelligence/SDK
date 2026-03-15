package com.acai.acai_flutter

import com.acai.core.Amplitude
import com.acai.core.events.BaseEvent
import com.acai.core.platform.Plugin

class FlutterLibraryPlugin(val library: String): Plugin {
    override val type: Plugin.Type = Plugin.Type.Enrichment
    override lateinit var amplitude: Amplitude

    override fun execute(event: BaseEvent): BaseEvent? {
        if (event.library == null) {
            event.library = library
        } else {
            event.library = "${library}_${event.library}"
        }
        return super.execute(event)
    }
}
