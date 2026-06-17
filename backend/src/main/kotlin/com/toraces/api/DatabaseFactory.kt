package com.toraces.api

import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.Database

object DatabaseFactory {
    fun init() {
        val dbUrl = System.getenv("DATABASE_URL") ?: "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;"
        val dbDriver = System.getenv("DATABASE_DRIVER") ?: "org.h2.Driver"
        val dbUser = System.getenv("DATABASE_USER") ?: "sa"
        val dbPassword = System.getenv("DATABASE_PASSWORD") ?: ""
        
        Database.connect(dbUrl, dbDriver, dbUser, dbPassword)
        
        transaction {
            SchemaUtils.create(UsersTable, SubscriptionsTable)
        }
    }
}

object UsersTable : LongIdTable("users") {
    val email = varchar("email", 255).uniqueIndex()
    val password = varchar("password", 255)
    val username = varchar("username", 100)
    val name = varchar("name", 255)
}

object SubscriptionsTable : LongIdTable("subscriptions") {
    val userId = reference("user_id", UsersTable)
    val stripeSubscriptionId = varchar("stripe_subscription_id", 255).nullable()
    val planType = varchar("plan_type", 50) // "basic", "premium", "elite"
    val status = varchar("status", 50).default("active") // active, cancelled, expired
    val startDate = datetime("start_date").defaultExpression(CurrentDateTime())
    val endDate = datetime("end_date").nullable()
}

class UserEntity(id: EntityID<Long>) : LongIdEntity(id) {
    companion object : LongIdEntityClass<UserEntity>(UsersTable)
    
    var email by UsersTable.email
    var password by UsersTable.password
    var username by UsersTable.username
    var name by UsersTable.name
}

class SubscriptionEntity(id: EntityID<Long>) : LongIdEntity(id) {
    companion object : LongIdEntityClass<SubscriptionEntity>(SubscriptionsTable)
    
    var userId by SubscriptionsTable.userId
    var stripeSubscriptionId by SubscriptionsTable.stripeSubscriptionId
    var planType by SubscriptionsTable.planType
    var status by SubscriptionsTable.status
    var startDate by SubscriptionsTable.startDate
    var endDate by SubscriptionsTable.endDate
}