object Versions {
    const val kotlin = "1.9.0"
    const val androidGradlePlugin = "8.1.0"
    const val coroutines = "1.7.3"
    const val okhttp = "4.11.0"
    const val gson = "2.10.1"
    const val junit = "4.13.2"
    const val mockk = "1.13.7"
    const val androidxTest = "1.5.0"
    const val minSdk = 21
    const val compileSdk = 34
    const val targetSdk = 34
}

object Libs {
    const val kotlinStdlib = "org.jetbrains.kotlin:kotlin-stdlib:${Versions.kotlin}"
    const val coroutinesCore = "org.jetbrains.kotlinx:kotlinx-coroutines-core:${Versions.coroutines}"
    const val coroutinesAndroid = "org.jetbrains.kotlinx:kotlinx-coroutines-android:${Versions.coroutines}"
    const val okhttp = "com.squareup.okhttp3:okhttp:${Versions.okhttp}"
    const val gson = "com.google.code.gson:gson:${Versions.gson}"

    // Test
    const val junit = "junit:junit:${Versions.junit}"
    const val mockk = "io.mockk:mockk:${Versions.mockk}"
    const val coroutinesTest = "org.jetbrains.kotlinx:kotlinx-coroutines-test:${Versions.coroutines}"
}
