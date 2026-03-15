package com.acai.core.utilities

import com.acai.core.LogLevel

class AnalyticsLogger(private val logLevel: LogLevel) {

    fun debug(message: String) {
        if (logLevel >= LogLevel.DEBUG) println("[Acai DEBUG] $message")
    }

    fun warn(message: String) {
        if (logLevel >= LogLevel.WARN) println("[Acai WARN] $message")
    }

    fun error(message: String) {
        if (logLevel >= LogLevel.ERROR) System.err.println("[Acai ERROR] $message")
    }
}
