package com.acai.samples

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.acai.android.Acai
import com.acai.android.Configuration
import com.acai.android.DefaultTrackingOptions
import com.acai.core.AcaiServer
import com.acai.core.Identify
import com.acai.core.LogLevel
import com.acai.core.Revenue

class MainActivity : AppCompatActivity() {

    private lateinit var acai: Acai

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // ── Initialize the SDK ──────────────────────────────────────────────
        acai = Acai(
            Configuration(
                apiKey = "YOUR_ACAI_API_KEY",
                context = applicationContext,
                serverZone = AcaiServer.US,        // or AcaiServer.EU
                logLevel = LogLevel.DEBUG,
                defaultTracking = DefaultTrackingOptions(
                    sessions = true,
                    appLifecycles = true,
                )
            )
        )

        // ── Set user ────────────────────────────────────────────────────────
        acai.setUserId("user-123")

        val identify = Identify()
            .set("plan", "premium")
            .setOnce("firstOpen", System.currentTimeMillis())
            .add("loginCount", 1)
        acai.identify(identify = identify)

        // ── Track events ────────────────────────────────────────────────────
        acai.track(
            eventType = "App Started",
            eventProperties = mapOf(
                "source" to "organic",
                "darkMode" to true,
            )
        )

        // ── Revenue ─────────────────────────────────────────────────────────
        val revenue = Revenue()
            .setProductId("premium_monthly")
            .setPrice(9.99)
            .setQuantity(1)
            .setRevenueType("subscription")
        acai.revenue(revenue)
    }
}
