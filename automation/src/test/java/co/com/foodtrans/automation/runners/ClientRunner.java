package co.com.foodtrans.automation.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/01_FoodTrans",
        glue = "co.com.foodtrans.automation.stepsdefinitions",
        tags = {"@cliente"},
        plugin = {"pretty", "html:target/cucumber-reports/client", "json:target/cucumber-client.json"},
        snippets = SnippetType.CAMELCASE,
        monochrome = true
)
public class    ClientRunner {
}
