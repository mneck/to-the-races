package com.toraces.api

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import io.ktor.testkit.TestApplicationEngine
import kotlin.test.Test
import kotlin.test.assertEquals

class UserRoutesTest {
    
    @Test
    fun testRegisterSuccess() = testApplication {
        application {
            module()
        }
        
        val response = client.post("/api/register") {
            contentType(ContentType.Application.Json)
            setBody("""
                {
                    "email": "test@example.com",
                    "password": "password123",
                    "username": "testuser",
                    "name": "Test User"
                }
            """)
        }
        
        assertEquals(HttpStatusCode.Created, response.status)
    }
    
    @Test
    fun testLoginSuccess() = testApplication {
        application {
            module()
        }
        
        // First register a user
        client.post("/api/register") {
            contentType(ContentType.Application.Json)
            setBody("""
                {
                    "email": "login@example.com",
                    "password": "password123",
                    "username": "loginuser",
                    "name": "Login User"
                }
            """)
        }
        
        // Then login
        val response = client.post("/api/login") {
            contentType(ContentType.Application.Json)
            setBody("""
                {
                    "email": "login@example.com",
                    "password": "password123"
                }
            """)
        }
        
        assertEquals(HttpStatusCode.OK, response.status)
    }
}
