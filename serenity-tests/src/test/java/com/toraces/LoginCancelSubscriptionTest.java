package com.toraces;

import net.serenitybdd.junit5.SerenityJUnit5Extension;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.ensure.Ensure;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

@ExtendWith(SerenityJUnit5Extension.class)
public class LoginCancelSubscriptionTest {
    
    Actor user = Actor.named("TestUser");
    private WebDriver driver;
    private long randomSuffix;
    private String email;
    
    private static final Target EMAIL_INPUT = Target.the("email input")
        .located(By.cssSelector("[data-testid='email-input']"));
    private static final Target PASSWORD_INPUT = Target.the("password input")
        .located(By.cssSelector("[data-testid='password-input']"));
    private static final Target LOGIN_BUTTON = Target.the("login button")
        .located(By.cssSelector("[data-testid='login-button']"));
    private static final Target NAME_INPUT = Target.the("name input")
        .located(By.cssSelector("[data-testid='name-input']"));
    private static final Target USERNAME_INPUT = Target.the("username input")
        .located(By.cssSelector("[data-testid='username-input']"));
    private static final Target REGISTER_BUTTON = Target.the("register button")
        .located(By.cssSelector("[data-testid='register-button']"));
    private static final Target VIEW_PLANS_BUTTON = Target.the("view plans button")
        .located(By.cssSelector("[data-testid='view-plans-button']"));
    private static final Target PURCHASE_BASIC_BUTTON = Target.the("purchase basic button")
        .located(By.cssSelector("[data-testid='purchase-basic-button']"));
    private static final Target CANCEL_SUBSCRIPTION_BUTTON = Target.the("cancel subscription button")
        .located(By.cssSelector("[data-testid='cancel-subscription-button']"));
    
    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        user.can(BrowseTheWeb.with(driver));
        randomSuffix = System.currentTimeMillis();
        email = "cancel" + randomSuffix + "@example.com";
    }
    
    @Test
    void loginAndCancelSubscription() {
        // Register user
        user.wasAbleTo(
            Open.url("http://localhost:3000/register"),
            Enter.theValue("Cancel User").into(NAME_INPUT),
            Enter.theValue("canceluser" + randomSuffix).into(USERNAME_INPUT),
            Enter.theValue(email).into(EMAIL_INPUT),
            Enter.theValue("Password123!").into(PASSWORD_INPUT),
            Click.on(REGISTER_BUTTON)
        );
        
        // Purchase subscription
        user.wasAbleTo(Click.on(VIEW_PLANS_BUTTON));
        user.wasAbleTo(Click.on(PURCHASE_BASIC_BUTTON));
        
        // Clear and login
        user.wasAbleTo(Open.url("http://localhost:3000/login"));
        user.wasAbleTo(
            Enter.theValue(email).into(EMAIL_INPUT),
            Enter.theValue("Password123!").into(PASSWORD_INPUT),
            Click.on(LOGIN_BUTTON)
        );
        
        // Verify subscription exists
        user.attemptsTo(
            Ensure.thatTheWebPage().containsText("basic")
        );
        
        // Cancel subscription
        user.wasAbleTo(Click.on(CANCEL_SUBSCRIPTION_BUTTON));
        
        // Verify cancellation
        user.attemptsTo(
            Ensure.thatTheWebPage().containsText("No active subscription")
        );
    }
}
