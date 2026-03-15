package com.acai.core

/**
 * Builder for user identity operations.
 *
 * Usage:
 * ```kotlin
 * val identify = Identify()
 *     .set("name", "John Doe")
 *     .setOnce("firstSeen", System.currentTimeMillis())
 *     .add("loginCount", 1)
 * acai.identify(identify = identify)
 * ```
 */
class Identify {
    internal val properties = HashMap<String, Any?>()

    fun set(property: String, value: Any?): Identify {
        setOp("\$set", property, value)
        return this
    }

    fun setOnce(property: String, value: Any?): Identify {
        setOp("\$setOnce", property, value)
        return this
    }

    fun add(property: String, value: Number): Identify {
        setOp("\$add", property, value)
        return this
    }

    fun append(property: String, value: Any?): Identify {
        setOp("\$append", property, value)
        return this
    }

    fun prepend(property: String, value: Any?): Identify {
        setOp("\$prepend", property, value)
        return this
    }

    fun unset(property: String): Identify {
        setOp("\$unset", property, "-")
        return this
    }

    fun clearAll(): Identify {
        properties.clear()
        properties["\$clearAll"] = "-"
        return this
    }

    @Suppress("UNCHECKED_CAST")
    private fun setOp(op: String, property: String, value: Any?) {
        val opMap = properties.getOrPut(op) { HashMap<String, Any?>() } as HashMap<String, Any?>
        opMap[property] = value
    }
}
