buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("net.serenity-bdd:serenity-gradle-plugin:2.1.1")
    }
}

plugins {
    java
}

apply(plugin = "net.serenity-bdd.aggregator")

group = "co.com.foodtrans"
version = "1.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("net.serenity-bdd:serenity-core:2.1.1")
    testImplementation("net.serenity-bdd:serenity-cucumber:1.9.51")
    testImplementation("net.serenity-bdd:serenity-screenplay:2.1.1")
    testImplementation("net.serenity-bdd:serenity-screenplay-webdriver:2.1.1")
    testImplementation("net.serenity-bdd:serenity-junit:2.1.1")
    testImplementation("junit:junit:4.13.2")
}

tasks.test {
    useJUnit()
    systemProperty("file.encoding", "UTF-8")
}
