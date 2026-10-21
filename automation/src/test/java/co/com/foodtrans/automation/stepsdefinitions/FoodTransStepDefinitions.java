package co.com.foodtrans.automation.stepsdefinitions;

import co.com.foodtrans.automation.utils.AutomationConfig;
import co.com.foodtrans.automation.userinterfaces.AdminPage;
import co.com.foodtrans.automation.userinterfaces.ClientPage;
import co.com.foodtrans.automation.userinterfaces.ClientPortalPage;
import co.com.foodtrans.automation.tasks.CreateClientAccount;
import co.com.foodtrans.automation.tasks.SignIn;
import co.com.foodtrans.automation.tasks.SubmitMovement;
import cucumber.api.java.Before;
import cucumber.api.java.After;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.screenplay.waits.WaitUntil;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class FoodTransStepDefinitions {
    private String createdClientEmail;
    private String testManifest;

    @Before
    public void configureScenario() {
        OnStage.setTheStage(new OnlineCast());
        OnStage.theActorCalled("Usuario FoodTrans");
        String driverPath = AutomationConfig.chromeDriver();
        if (!driverPath.isEmpty()) System.setProperty("webdriver.chrome.driver", driverPath);
    }

    @After
    public void closeScenario() {
        OnStage.drawTheCurtain();
    }

    @Dado("^que se abre FoodTrans$")
    public void openFoodTrans() {
        OnStage.theActorInTheSpotlight().attemptsTo(Open.url(AutomationConfig.baseUrl()));
        waitFor(LoginPageTarget.EMAIL);
    }

    @Cuando("^el administrador inicia sesión$")
    public void adminSignsIn() {
        signIn(AutomationConfig.adminEmail(), AutomationConfig.adminPassword());
    }

    @Dado("^el cliente inicia sesión$")
    public void clientSignsIn() {
        signIn(AutomationConfig.clientEmail(), AutomationConfig.clientPassword());
        waitFor(ClientPortalPage.PORTAL_TITLE);
    }

    @Entonces("^se muestra el panel de administración$")
    public void adminPanelIsVisible() {
        waitFor(AdminPage.DASHBOARD_TITLE);
    }

    @Cuando("^crea una cuenta de cliente de prueba$")
    public void createTestClient() {
        String suffix = String.valueOf(System.currentTimeMillis());
        createdClientEmail = "cliente.auto." + suffix + "@foodtrans.test";
        OnStage.theActorInTheSpotlight().attemptsTo(
                CreateClientAccount.with("Cliente de prueba", "Empresa automática", createdClientEmail, "ClienteAuto123")
        );
    }

    @Entonces("^la cuenta nueva aparece en la tabla de clientes$")
    public void clientAccountIsListed() {
        waitFor(AdminPage.CLIENTS_TITLE);
        waitFor(ClientPage.clientEmail(createdClientEmail));
    }

    @Cuando("^radica un movimiento de prueba para hoy$")
    public void submitMovement() {
        testManifest = "AUTO-" + System.currentTimeMillis();
        String today = LocalDate.now(ZoneId.of("America/Bogota")).format(DateTimeFormatter.ISO_LOCAL_DATE);
        OnStage.theActorInTheSpotlight().attemptsTo(
                SubmitMovement.with(today, "NQR-AUTO", "Bogotá", "Medellín", testManifest)
        );
        waitForMovementSubmission();
    }

    @Cuando("^abre el calendario de viajes$")
    public void openCalendar() {
        OnStage.theActorInTheSpotlight().attemptsTo(Click.on(ClientPortalPage.CALENDAR_NAV));
    }

    @Entonces("^el movimiento aparece en el día seleccionado$")
    public void movementAppearsInCalendar() {
        Target eventDay = Target.the("día resaltado con el movimiento de prueba")
                .located(org.openqa.selenium.By.cssSelector("button.calendar-day--has-events"));
        waitFor(eventDay);
        Assert.assertTrue("El manifiesto de prueba debe aparecer en el detalle del calendario", isVisibleWithinPage(ClientPortalPage.movementManifest(testManifest)));
    }

    @Entonces("^se muestra el calendario de administración$")
    public void adminCalendarIsVisible() {
        waitFor(AdminPage.CALENDAR_TITLE);
        Target calendar = Target.the("grilla del calendario de administración")
                .located(org.openqa.selenium.By.cssSelector(".calendar-days"));
        waitFor(calendar);
    }

    private void signIn(String email, String password) {
        OnStage.theActorInTheSpotlight().attemptsTo(SignIn.withCredentials(email, password));
    }

    private void waitFor(Target target) {
        OnStage.theActorInTheSpotlight().attemptsTo(WaitUntil.the(target, isVisible()).forNoMoreThan(15).seconds());
    }

    private void waitForMovementSubmission() {
        Actor actor = OnStage.theActorInTheSpotlight();
        WebDriver driver = BrowseTheWeb.as(actor).getDriver();
        new WebDriverWait(driver, 15).until(webDriver ->
                webDriver.findElements(org.openqa.selenium.By.cssSelector(".form-success, .form-error"))
                        .stream()
                        .anyMatch(WebElement::isDisplayed)
        );

        List<WebElement> errors = driver.findElements(org.openqa.selenium.By.cssSelector(".form-error"));
        if (errors.stream().anyMatch(WebElement::isDisplayed)) {
            String message = errors.stream()
                    .filter(WebElement::isDisplayed)
                    .map(WebElement::getText)
                    .findFirst()
                    .orElse("Error no especificado en el formulario.");
            Assert.fail("FoodTrans no pudo radicar el movimiento: " + message);
        }

        waitFor(ClientPortalPage.MOVEMENT_SUCCESS);
    }

    private boolean isVisibleWithinPage(Target target) {
        Actor actor = OnStage.theActorInTheSpotlight();
        WebDriver driver = BrowseTheWeb.as(actor).getDriver();
        return new WebDriverWait(driver, 15).until(webDriver -> target.resolveFor(actor).isVisible());
    }

    private static final class LoginPageTarget {
        private static final Target EMAIL = Target.the("campo de correo de inicio de sesión")
                .located(org.openqa.selenium.By.id("email"));
    }
}
