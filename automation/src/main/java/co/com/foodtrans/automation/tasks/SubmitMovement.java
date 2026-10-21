package co.com.foodtrans.automation.tasks;

import co.com.foodtrans.automation.userinterfaces.ClientPortalPage;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class SubmitMovement implements Task {
    private final String date;
    private final String vehicle;
    private final String origin;
    private final String destination;
    private final String manifest;

    public SubmitMovement(String date, String vehicle, String origin, String destination, String manifest) {
        this.date = date;
        this.vehicle = vehicle;
        this.origin = origin;
        this.destination = destination;
        this.manifest = manifest;
    }

    public static SubmitMovement with(String date, String vehicle, String origin, String destination, String manifest) {
        return instrumented(SubmitMovement.class, date, vehicle, origin, destination, manifest);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Enter.theValue(vehicle).into(ClientPortalPage.VEHICLE),
                Enter.theValue(origin).into(ClientPortalPage.ORIGIN),
                Enter.theValue(destination).into(ClientPortalPage.DESTINATION),
                Enter.theValue(manifest).into(ClientPortalPage.MANIFEST)
        );

        WebElement dateInput = ClientPortalPage.MOVEMENT_DATE.resolveFor(actor);
        JavascriptExecutor browser = (JavascriptExecutor) BrowseTheWeb.as(actor).getDriver();
        browser.executeScript(
                "const input = arguments[0];" +
                        "const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;" +
                        "setter.call(input, arguments[1]);" +
                        "input.dispatchEvent(new Event('input', { bubbles: true }));" +
                        "input.dispatchEvent(new Event('change', { bubbles: true }));",
                dateInput,
                date
        );

        actor.attemptsTo(Click.on(ClientPortalPage.SUBMIT));
    }
}
