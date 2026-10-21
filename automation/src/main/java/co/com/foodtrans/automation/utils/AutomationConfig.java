package co.com.foodtrans.automation.utils;

public final class AutomationConfig {
    private AutomationConfig() {}

    public static String baseUrl() {
        return setting("FOODTRANS_BASE_URL", "foodtrans.base.url", "http://127.0.0.1:5173");
    }

    public static String adminEmail() {
        return setting("FOODTRANS_ADMIN_EMAIL", "foodtrans.admin.email", "admin123@gmail.com");
    }

    public static String adminPassword() {
        return setting("FOODTRANS_ADMIN_PASSWORD", "foodtrans.admin.password", "Admin12345");
    }

    public static String clientEmail() {
        return setting("FOODTRANS_CLIENT_EMAIL", "foodtrans.client.email", "Carlos@gmail.com");
    }

    public static String clientPassword() {
        return setting("FOODTRANS_CLIENT_PASSWORD", "foodtrans.client.password", "Cliente123");
    }

    public static String chromeDriver() {
        return setting("CHROMEDRIVER", "webdriver.chrome.driver", "");
    }

    private static String setting(String environmentName, String propertyName, String fallback) {
        String environmentValue = System.getenv(environmentName);
        if (environmentValue != null && !environmentValue.trim().isEmpty()) return environmentValue.trim();

        String propertyValue = System.getProperty(propertyName);
        if (propertyValue != null && !propertyValue.trim().isEmpty()) return propertyValue.trim();

        return fallback;
    }
}
