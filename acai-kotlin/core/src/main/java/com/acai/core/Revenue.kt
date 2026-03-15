package com.acai.core

/**
 * Builder for revenue tracking events.
 */
class Revenue {
    var productId: String? = null
    var quantity: Int = 1
    var price: Double? = null
    var revenueType: String? = null
    var receipt: String? = null
    var receiptSig: String? = null
    var eventProperties: HashMap<String, Any?>? = null

    fun setProductId(productId: String): Revenue { this.productId = productId; return this }
    fun setQuantity(quantity: Int): Revenue { this.quantity = quantity; return this }
    fun setPrice(price: Double): Revenue { this.price = price; return this }
    fun setRevenueType(revenueType: String): Revenue { this.revenueType = revenueType; return this }
    fun setReceipt(receipt: String, sig: String): Revenue { this.receipt = receipt; this.receiptSig = sig; return this }

    internal fun toEventProperties(): HashMap<String, Any?> {
        val props = eventProperties?.let { HashMap(it) } ?: HashMap()
        productId?.let { props["\$productId"] = it }
        props["\$quantity"] = quantity
        price?.let { props["\$price"] = it; props["\$revenue"] = it * quantity }
        revenueType?.let { props["\$revenueType"] = it }
        receipt?.let { props["\$receipt"] = it }
        receiptSig?.let { props["\$receiptSig"] = it }
        return props
    }
}
