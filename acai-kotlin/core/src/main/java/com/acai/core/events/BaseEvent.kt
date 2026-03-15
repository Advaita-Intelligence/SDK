package com.acai.core.events

import com.google.gson.annotations.SerializedName

/**
 * Base class for all Acai events.
 */
open class BaseEvent {
    @SerializedName("event_type") var eventType: String = ""
    @SerializedName("user_id") var userId: String? = null
    @SerializedName("device_id") var deviceId: String? = null
    @SerializedName("time") var timestamp: Long? = null
    @SerializedName("insert_id") var insertId: String? = null
    @SerializedName("library") var library: String? = null
    @SerializedName("app_version") var appVersion: String? = null
    @SerializedName("platform") var platform: String? = null
    @SerializedName("os_name") var osName: String? = null
    @SerializedName("os_version") var osVersion: String? = null
    @SerializedName("device_brand") var deviceBrand: String? = null
    @SerializedName("device_manufacturer") var deviceManufacturer: String? = null
    @SerializedName("device_model") var deviceModel: String? = null
    @SerializedName("carrier") var carrier: String? = null
    @SerializedName("country") var country: String? = null
    @SerializedName("region") var region: String? = null
    @SerializedName("city") var city: String? = null
    @SerializedName("dma") var dma: String? = null
    @SerializedName("language") var language: String? = null
    @SerializedName("ip") var ip: String? = null
    @SerializedName("idfa") var idfa: String? = null
    @SerializedName("idfv") var idfv: String? = null
    @SerializedName("adid") var adid: String? = null
    @SerializedName("android_id") var androidId: String? = null
    @SerializedName("event_id") var eventId: Int? = null
    @SerializedName("session_id") var sessionId: Long? = null
    @SerializedName("event_properties") var eventProperties: HashMap<String, Any?>? = null
    @SerializedName("user_properties") var userProperties: HashMap<String, Any?>? = null
    @SerializedName("groups") var groups: HashMap<String, Any?>? = null
    @SerializedName("group_properties") var groupProperties: HashMap<String, Any?>? = null
    @SerializedName("sequence_number") var sequenceNumber: Long? = null
    @SerializedName("version_name") var versionName: String? = null
    @SerializedName("plan") var plan: Plan? = null
    @SerializedName("ingestion_metadata") var ingestionMetadata: IngestionMetadata? = null
    @SerializedName("partner_id") var partnerId: String? = null
    @SerializedName("extra") var extra: Map<String, Any>? = null

    // Internal tracking — not serialized to JSON
    @Transient var attempts: Int = 0
    @Transient var callback: ((BaseEvent, Int, String) -> Unit)? = null
}

data class Plan(
    @SerializedName("branch") val branch: String? = null,
    @SerializedName("source") val source: String? = null,
    @SerializedName("version") val version: String? = null,
    @SerializedName("versionId") val versionId: String? = null,
)

data class IngestionMetadata(
    @SerializedName("source_name") val sourceName: String? = null,
    @SerializedName("source_version") val sourceVersion: String? = null,
)

data class EventOptions(
    var userId: String? = null,
    var deviceId: String? = null,
    var timestamp: Long? = null,
    var insertId: String? = null,
    var plan: Plan? = null,
    var ingestionMetadata: IngestionMetadata? = null,
    var partnerId: String? = null,
    var callback: ((BaseEvent, Int, String) -> Unit)? = null,
    var extra: Map<String, Any>? = null,
)
