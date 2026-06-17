# Backend Dockerfile using Gradle
FROM gradle:jdk21 AS build

WORKDIR /app

# Copy build files
COPY build.gradle.kts settings.gradle.kts ./

# Download dependencies
RUN gradle dependencies --quiet

# Copy source code
COPY src ./src

# Build the fat JAR
RUN gradle shadowJar --quiet

# Runtime stage - using correct JDK 21 image
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy the built fat JAR
COPY --from=build /app/build/libs/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]