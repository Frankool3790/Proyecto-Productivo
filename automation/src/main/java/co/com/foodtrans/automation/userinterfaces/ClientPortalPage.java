package co.com.foodtrans.automation.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ClientPortalPage {
    public static final Target PORTAL_TITLE = Target.the("título para radicar movimientos")
            .located(By.xpath("//h1[normalize-space()='Radicar movimiento']"));
    public static final Target MOVEMENT_DATE = Target.the("fecha del movimiento").located(By.id("movementDate"));
    public static final Target VEHICLE = Target.the("vehículo del movimiento").located(By.id("vehicle"));
    public static final Target ORIGIN = Target.the("origen del movimiento").located(By.id("origin"));
    public static final Target DESTINATION = Target.the("destino del movimiento").located(By.id("destination"));
    public static final Target MANIFEST = Target.the("número de manifiesto").located(By.id("manifestNumber"));
    public static final Target SUBMIT = Target.the("botón radicar movimiento")
            .located(By.xpath("//button[@type='submit' and contains(.,'Radicar movimiento')]"));
    public static final Target MOVEMENT_SUCCESS = Target.the("confirmación de movimiento radicado")
            .located(By.cssSelector(".form-success"));
    public static final Target CALENDAR_NAV = Target.the("opción calendario del menú")
            .located(By.xpath("//button[contains(@class,'nav__item') and contains(normalize-space(.), 'Calendario')]"));
    public static Target movementManifest(String manifest) {
        return Target.the("manifiesto " + manifest + " en el detalle del calendario")
                .located(By.xpath("//article[contains(@class,'calendar-event-card')]//dd[normalize-space(.)='" + manifest + "']"));
    }
}
