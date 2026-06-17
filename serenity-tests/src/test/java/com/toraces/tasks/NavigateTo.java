package com.toraces.tasks;

import net.serenitybdd.screenplay.Performable;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actions.Click;

public class NavigateTo {
    public static Performable theirHomePage() {
        return Task.where("{0} opens the home page",
            Open.browserOn().the(HomePage.class)
        );
    }
    
    public static Performable the(String url) {
        return Task.where("{0} navigates to " + url,
            Open.browserOn().thePage().withRelativeUrl(url)
        );
    }
}
