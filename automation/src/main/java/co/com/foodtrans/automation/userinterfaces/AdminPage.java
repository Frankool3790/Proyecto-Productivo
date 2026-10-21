package co.com.foodtrans.automation.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class AdminPage {
    public static final Target DASHBOARD_TITLE = Target.the("título del panel de administración")
            .located(By.xpath("//h1[normalize-space()='Resumen operativo']"));
    public static final Target CLIENTS_NAV = navigationButton("Clientes");
    public static final Target CALENDAR_NAV = navigationButton("Calendario");
    public static final Target CLIENTS_TITLE = Target.the("título de clientes")
            .located(By.xpath("//h1[normalize-space()='Clientes']"));
    public static final Target CALENDAR_TITLE = Target.the("título del calendario")
            .located(By.xpath("//h1[normalize-space()='Calendario de viajes']"));

    private static Target navigationButton(String label) {
        return Target.the("opción " + label + " del menú")
                .located(By.xpath("//button[contains(@class,'nav__item') and contains(normalize-space(.), '" + label + "')]"));
    }
}
