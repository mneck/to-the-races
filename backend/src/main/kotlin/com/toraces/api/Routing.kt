package com.toraces.api

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.auth.UserIdPrincipal
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.http.*
import org.mindrot.jbcrypt.BCrypt
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.stripe.Stripe
import java.util.Date
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.transactions.transaction

@Serializable
data class CreateUserRequest(val email: String, val password: String, val username: String, val name: String)

@Serializable
data class LoginRequest(val email: String, val password: String)

@Serializable
data class UpdateUserRequest(val name: String? = null, val username: String? = null)

@Serializable
data class CreateSubscriptionRequest(val planType: String)

@Serializable
data class LoginResponse(val token: String, val userId: Long, val username: String, val name: String, val email: String)

@Serializable
data class CheckoutSessionResponse(val sessionId: String, val url: String)

fun Route.authRoutes(secret: ByteArray) {
    post("/api/register") {
        val request = call.receive<CreateUserRequest>()
        
        try {
            val hashedPassword = BCrypt.hashpw(request.password, BCrypt.gensalt())
            
            val userId = transaction {
                UserEntity.new {
                    email = request.email
                    password = hashedPassword
                    username = request.username
                    name = request.name
                }.id.value
            }
            
            call.respond(HttpStatusCode.Created, mapOf("userId" to userId))
        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Email already exists"))
        }
    }
    
    post("/api/login") {
        val request = call.receive<LoginRequest>()
        
        val user = transaction {
            UserEntity.find { UsersTable.email eq request.email }.firstOrNull()
        }
        
        if (user != null && BCrypt.checkpw(request.password, user.password)) {
            val token = JWT.create()
                .withIssuer("to-the-races")
                .withClaim("userId", user.id.value.toString())
                .withIssuedAt(Date())
                .withExpiresAt(Date(System.currentTimeMillis() + 86400000)) // 24 hours
                .sign(Algorithm.HMAC256(secret))
            
            call.respond(LoginResponse(
                token = token,
                userId = user.id.value,
                username = user.username,
                name = user.name,
                email = user.email
            ))
        } else {
            call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Invalid credentials"))
        }
    }
    
    authenticate("auth-jwt") {
        get("/api/me") {
            val principal = call.principal<UserIdPrincipal>()
            val user = transaction {
                UserEntity.findById(principal?.id?.toLong())
            }
            
            if (user != null) {
                call.respond(mapOf(
                    "userId" to user.id.value,
                    "username" to user.username,
                    "name" to user.name,
                    "email" to user.email
                ))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "User not found"))
            }
        }
        
        put("/api/me") {
            val principal = call.principal<UserIdPrincipal>()
            val request = call.receive<UpdateUserRequest>()
            
            val user = transaction {
                UserEntity.findById(principal?.id?.toLong())
            }
            
            if (user != null) {
                transaction {
                    if (request.name != null) user.name = request.name
                    if (request.username != null) user.username = request.username
                }
                call.respond(HttpStatusCode.OK, mapOf("success" to true))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "User not found"))
            }
        }
    }
}

fun Route.userRoutes() {
    authenticate("auth-jwt") {
        get("/api/users/{id}") {
            val userId = call.parameters["id"]?.toLongOrNull()
            if (userId == null) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid user ID"))
                return@get
            }
            
            val user = transaction {
                UserEntity.findById(userId)
            }
            
            if (user != null) {
                call.respond(mapOf(
                    "userId" to user.id.value,
                    "username" to user.username,
                    "name" to user.name,
                    "email" to user.email
                ))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "User not found"))
            }
        }
    }
}

fun Route.subscriptionRoutes() {
    authenticate("auth-jwt") {
        get("/api/subscription") {
            val principal = call.principal<UserIdPrincipal>()
            
            val subscription = transaction {
                SubscriptionEntity.find { SubscriptionsTable.userId eq principal?.id?.toLong() }.firstOrNull()
            }
            
            if (subscription != null) {
                call.respond(mapOf(
                    "subscriptionId" to subscription.id.value,
                    "planType" to subscription.planType,
                    "status" to subscription.status
                ))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "No subscription found"))
            }
        }
        
        post("/api/subscription") {
            val principal = call.principal<UserIdPrincipal>()
            val request = call.receive<CreateSubscriptionRequest>()

            val validPlanTypes = setOf("basic", "premium", "elite")
            if (request.planType !in validPlanTypes) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid plan type"))
                return@post
            }

            // Initialize Stripe if key is available
            val stripeKey = System.getenv("STRIPE_SECRET_KEY")
            if (stripeKey != null) {
                Stripe.apiKey = stripeKey
            }

            val userId = principal?.id?.toLong()
            if (userId == null) {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Not authenticated"))
                return@post
            }
            
            val subscriptionId = transaction {
                SubscriptionEntity.new {
                    this.userId = userId
                    planType = request.planType
                    status = "active"
                }.id.value
            }
            
            call.respond(HttpStatusCode.Created, mapOf(
                "subscriptionId" to subscriptionId,
                "message" to "Subscription created successfully"
            ))
        }
        
        delete("/api/subscription") {
            val principal = call.principal<UserIdPrincipal>()
            
            val subscription = transaction {
                SubscriptionEntity.find { SubscriptionsTable.userId eq principal?.id?.toLong() }.firstOrNull()
            }
            
            if (subscription != null) {
                transaction {
                    subscription.status = "cancelled"
                }
                call.respond(HttpStatusCode.OK, mapOf("success" to true))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "No subscription found"))
            }
        }
    }
}

fun Route.stripeRoutes() {
    // Endpoint to create a checkout session (for future real integration)
    post("/api/stripe/create-checkout-session") {
        val stripeKey = System.getenv("STRIPE_SECRET_KEY")
        
        if (stripeKey == null) {
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Stripe not configured"))
            return@post
        }
        
        // Placeholder for real Stripe integration
        call.respond(mapOf(
            "sessionId" to "cs_test_${System.currentTimeMillis()}",
            "url" to "/plans"
        ))
    }
    
    // Webhook handler for Stripe events
    post("/api/stripe/webhook") {
        call.respond(HttpStatusCode.OK, mapOf("received" to true))
    }
}