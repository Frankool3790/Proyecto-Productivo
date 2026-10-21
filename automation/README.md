# Automatización funcional de FoodTrans NQR

Este subproyecto automatiza flujos de navegador de FoodTrans NQR con Serenity BDD, Cucumber y Screenplay, siguiendo la estructura de `Automa/auto`.

## Requisitos

- Java 8 instalado y disponible en `PATH`.
- Google Chrome instalado.
- La aplicación FoodTrans NQR y su API en ejecución. La base de datos también debe estar disponible.
- ChromeDriver compatible con la versión instalada de Chrome. Se conserva el driver local de la referencia en `src/test/resources/driver/chromedriver.exe`.

En PowerShell, si ChromeDriver no está en `PATH`:

```powershell
$env:CHROMEDRIVER = 'C:\ruta\a\chromedriver.exe'
```

Si el ChromeDriver incluido no coincide con la versión de Chrome del equipo, actualiza ese archivo o define `CHROMEDRIVER`.

Inicia los servicios del proyecto en terminales separadas. Para la base de datos:

```powershell
cd ..\database
docker compose up -d
```

Inicia también la API desde `backend` con `npm run dev` y el frontend desde `foodtrans-nqr` con `npm run dev`.

## Ejecutar

Desde esta carpeta:

```powershell
.\gradlew.bat test
```

La suite general está en `src/test/java/co/com/foodtrans/automation/runners/FoodTransRegressionTest.java`. También están los runners `AdminRunner` y `ClientRunner` para lanzar por separado los escenarios etiquetados `@admin` y `@cliente` desde el IDE.

En IntelliJ IDEA puedes abrir cada runner y elegir **Run**. `FoodTransRegressionTest` ejecuta la regresión completa; `AdminRunner` y `ClientRunner` ejecutan solo los escenarios de su rol.

La primera ejecución descarga Gradle y las dependencias del proyecto. Gradle genera el reporte de Serenity y las evidencias en `target/site/serenity`.

## Estructura

Se conserva la organización de `Automa/auto`: `src/main/java` contiene `Models`, `questions`, `tasks`, `userinterfaces` y `utils`; `src/test/java` contiene `runners` y `stepsdefinitions`; `src/test/resources` contiene `features`, `driver` y los recursos de reporte `.cucumber+`.

`build.gradle` es la configuración Gradle principal y conserva las versiones Serenity/Cucumber, dependencias auxiliares, ejecución JUnit y agregación de reportes de la referencia. También se mantienen las configuraciones `build.gradle.kts` y `pom.xml` adaptadas a FoodTrans.

## Configuración

Se pueden cambiar la URL y las credenciales con estas variables de entorno:

| Variable | Valor predeterminado |
| --- | --- |
| `FOODTRANS_BASE_URL` | `http://127.0.0.1:5173` |
| `FOODTRANS_ADMIN_EMAIL` | `admin123@gmail.com` |
| `FOODTRANS_ADMIN_PASSWORD` | `Admin12345` |
| `FOODTRANS_CLIENT_EMAIL` | `Carlos@gmail.com` |
| `FOODTRANS_CLIENT_PASSWORD` | `Cliente123` |
| `CHROMEDRIVER` | Usa ChromeDriver de `PATH` |

Los escenarios de creación de cliente y radicación de movimiento escriben registros de prueba en la base de datos. Para conservar limpia la información, ejecútalos en una base de desarrollo.
