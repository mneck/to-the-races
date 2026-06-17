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
public class LoginEditUsernameTest {
    
    Actor user = Actor.named("TestUser");
    private WebDriver driver;
    private long randomSuffix;
    
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
    private static final Target EDIT_PROFILE_BUTTON = Target.the("edit profile button")
        .located(By.cssSelector("[data-testid='edit-profile-button']"));
    private static final Target EDIT_USERNAME_INPUT = Target.the("edit username input")
        .located(By.cssSelector("[data-testid='edit-username-input']"));
    private static final Target SAVE_PROFILE_BUTTON = Target.the("save profile button")
        .located(By.cssSelector("[data-testid='save-profile-button']"));
    
    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        user.can(BrowseTheWeb.with(driver));
        randomSuffix = System.currentTimeMillis();
    }
    
    @Test
    void loginAndEditUsername() {
        String email = "username" + randomSuffix + "@example.com";
        
        // Register user
        user.wasAbleTo(
            Open.url("http://localhost:3000/register"),
            Enter.theValue("Username User").into(NAME_INPUT),
            Enter.theValue("origuser" + randomSuffix).into(USERNAME_INPUT),
            Enter.theValue(email).into(EMAIL_INPUT),
            Enter.theValue("Password123!").into(PASSWORD_INPUT),
            Click.on(REGISTER_BUTTON)
        );
        
        // Clear and login
        user.wasAbleTo(Open.url("http://localhost:3000/login"));
        user.wasAbleTo(
            Enter.theValue(email).into(EMAIL_INPUT),
            Enter.theValue("Password123!").into(PASSWORD_INPUT),
            Click.on(LOGIN_BUTTON)
        );
        
        // Verify original username
        user.attemptsTo(
            Ensure.thatTheWebPage().containsText("origuser" + randomSuffix)
        );
        
        // Edit username
        user.wasAbleTo(Click.on(EDIT_PROFILE_BUTTON));
        user.wasAbleTo(
            Enter.theValue("newusername").into(EDIT_USERNAME_INPUT),
            Click.on(SAVE_PROFILE_BUTTON)
        );
        
        // Verify update
        user.attemptsTo(
            Ensure.thatTheWebPage().containsText("newusername")
        );
    }
}
