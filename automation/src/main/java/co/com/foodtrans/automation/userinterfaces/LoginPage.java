package co.com.foodtrans.automation.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LoginPage {
    public static final Target EMAIL = Target.the("correo electrónico").located(By.id("email"));
    public static final Target PASSWORD = Target.the("contraseña").located(By.id("password"));
    public static final Target SUBMIT = Target.the("botón iniciar sesión")
            .located(By.cssSelector("button[type='submit']"));
}
