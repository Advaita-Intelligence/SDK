package com.acai.core

/**
 * Controls which user properties are automatically tracked by the SDK.
 */
data class TrackingOptions(
    var trackIpAddress: Boolean = true,
    var trackCountry: Boolean = true,
    var trackCity: Boolean = true,
    var trackDma: Boolean = true,
    var trackRegion: Boolean = true,
    var trackOsName: Boolean = true,
    var trackOsVersion: Boolean = true,
    var trackDeviceModel: Boolean = true,
    var trackDeviceManufacturer: Boolean = true,
    var trackCarrier: Boolean = true,
    var trackLanguage: Boolean = true,
    var trackPlatform: Boolean = true,
    var trackVersionName: Boolean = true,
    var trackAdid: Boolean = true,
    var trackAppSetId: Boolean = true,
)
