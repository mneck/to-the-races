package com.toraces.api

import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.auth.*
import io.ktor.server.plugins.auth.jwt.*
import io.ktor.server.netty.EngineMain
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import io.ktor.server.auth.UserIdPrincipal
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm

fun main(args: Array<String>) = EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
fun Application.module() {
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
            prettyPrint = true
        })
    }
    
    // Initialize database
    DatabaseFactory.init()
    
    val secret = System.getenv("JWT_SECRET") ?: "default-secret-key-for-development-only"
    
    install(Authentication) {
        jwt("auth-jwt") {
            realm = "to-the-races"
            verifier(
                JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("to-the-races")
                    .build()
            )
            validate { credential ->
                val userId = credential.payload.getClaim("userId").asString
                if (userId != null) {
                    UserIdPrincipal(userId)
                } else {
                    null
                }
            }
        }
    }
    
    routing {
        userRoutes()
        authRoutes(secret.toByteArray())
        subscriptionRoutes()
        stripeRoutes()
    }
}