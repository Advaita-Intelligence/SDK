plugins {
    id("java-library")
    id("org.jetbrains.kotlin.jvm")
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

dependencies {
    implementation(Libs.kotlinStdlib)
    implementation(Libs.coroutinesCore)
    implementation(Libs.okhttp)
    implementation(Libs.gson)

    testImplementation(Libs.junit)
    testImplementation(Libs.mockk)
    testImplementation(Libs.coroutinesTest)
}
