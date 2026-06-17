package com.toraces.pages;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class RegisterPage {
    public static final Target NAME_INPUT = Target.the("name input")
        .located(By.cssSelector("[data-testid='name-input']"));
    public static final Target USERNAME_INPUT = Target.the("username input")
        .located(By.cssSelector("[data-testid='username-input']"));
    public static final Target EMAIL_INPUT = Target.the("email input")
        .located(By.cssSelector("[data-testid='email-input']"));
    public static final Target PASSWORD_INPUT = Target.the("password input")
        .located(By.cssSelector("[data-testid='password-input']"));
    public static final Target REGISTER_BUTTON = Target.the("register button")
        .located(By.cssSelector("[data-testid='register-button']"));
}
