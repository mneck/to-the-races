package com.toraces;

import net.serenitybdd.junit5.SerenityJUnit5Extension;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Serenity;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.ensure.Ensure;
import net.serenitybdd.screenplay.targets.Target;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.By;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

@ExtendWith(SerenityJUnit5Extension.class)
public class CreateUserTest {
    
    Actor user = Actor.named("TestUser");
    WebDriver driver;
    
    private static final Target NAME_INPUT = Target.the("name input")
        .located(By.cssSelector("[data-testid='name-input']"));
    private static final Target USERNAME_INPUT = Target.the("username input")
        .located(By.cssSelector("[data-testid='username-input']"));
    private static final Target EMAIL_INPUT = Target.the("email input")
        .located(By.cssSelector("[data-testid='email-input']"));
    private static final Target PASSWORD_INPUT = Target.the("password input")
        .located(By.cssSelector("[data-testid='password-input']"));
    private static final Target REGISTER_BUTTON = Target.the("register button")
        .located(By.cssSelector("[data-testid='register-button']"));
    
    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        user.can(BrowseTheWeb.with(driver));
    }
    
    @Test
    void createNewUser() {
        long randomSuffix = System.currentTimeMillis();
        
        user.wasAbleTo(
            Open.url("http://localhost:3000/register"),
            Enter.theValue("Serenity User").into(NAME_INPUT),
            Enter.theValue("serenity" + randomSuffix).into(USERNAME_INPUT),
            Enter.theValue("serenity" + randomSuffix + "@example.com").into(EMAIL_INPUT),
            Enter.theValue("Password123!").into(PASSWORD_INPUT),
            Click.on(REGISTER_BUTTON)
        );
        
        user.attemptsTo(
            Ensure.thatTheCurrentPage().currentUrl().contains("/dashboard")
        );
    }
}
