package com.acai.core.events

class IdentifyEvent : BaseEvent() {
    init {
        eventType = "\$identify"
    }
}

class GroupIdentifyEvent : BaseEvent() {
    init {
        eventType = "\$groupidentify"
    }
    var groupType: String? = null
    var groupName: String? = null
}

class RevenueEvent : BaseEvent() {
    init {
        eventType = "acai_revenue_amount"
    }
}
