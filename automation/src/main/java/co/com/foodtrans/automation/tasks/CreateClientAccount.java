package co.com.foodtrans.automation.tasks;

import co.com.foodtrans.automation.userinterfaces.AdminPage;
import co.com.foodtrans.automation.userinterfaces.ClientPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class CreateClientAccount implements Task {
    private final String name;
    private final String company;
    private final String email;
    private final String password;

    public CreateClientAccount(String name, String company, String email, String password) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.password = password;
    }

    public static CreateClientAccount with(String name, String company, String email, String password) {
        return instrumented(CreateClientAccount.class, name, company, email, password);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(AdminPage.CLIENTS_NAV),
                Enter.theValue(name).into(ClientPage.FULL_NAME),
                Enter.theValue(company).into(ClientPage.COMPANY),
                Enter.theValue(email).into(ClientPage.EMAIL),
                Enter.theValue(password).into(ClientPage.PASSWORD),
                Click.on(ClientPage.CREATE)
        );
    }
}
