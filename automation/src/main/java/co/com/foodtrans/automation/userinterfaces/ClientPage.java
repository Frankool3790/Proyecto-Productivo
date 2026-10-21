package co.com.foodtrans.automation.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ClientPage {
    public static final Target FULL_NAME = Target.the("nombre del cliente").located(By.id("clientFullName"));
    public static final Target COMPANY = Target.the("empresa del cliente").located(By.id("clientCompanyName"));
    public static final Target EMAIL = Target.the("correo del cliente").located(By.id("clientEmail"));
    public static final Target PASSWORD = Target.the("contraseña inicial del cliente").located(By.id("clientPassword"));
    public static final Target CREATE = Target.the("botón crear cliente")
            .located(By.xpath("//button[@type='submit' and contains(.,'Crear cliente')]"));
    public static Target clientEmail(String email) {
        return Target.the("correo " + email + " en la lista de clientes")
                .located(By.xpath("//td[normalize-space(.)='" + email + "']"));
    }
}
