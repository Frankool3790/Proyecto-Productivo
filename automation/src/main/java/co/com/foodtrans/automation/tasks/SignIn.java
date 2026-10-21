package co.com.foodtrans.automation.tasks;

import co.com.foodtrans.automation.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class SignIn implements Task {
    private final String email;
    private final String password;

    public SignIn(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static SignIn withCredentials(String email, String password) {
        return instrumented(SignIn.class, email, password);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Enter.theValue(email).into(LoginPage.EMAIL),
                Enter.theValue(password).into(LoginPage.PASSWORD),
                Click.on(LoginPage.SUBMIT)
        );
    }
}
