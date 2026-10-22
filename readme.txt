MANUAL DE EJECUCIÓN — FOODTRANS NQR
====================================

Este manual explica cómo iniciar MySQL, la API, la página web y la
automatización en Windows.

1. REQUISITOS Y ESTRUCTURA
--------------------------
Instala Docker Desktop, Node.js con npm, Java 8 y Google Chrome. Para la
automatización también necesitas ChromeDriver compatible con Chrome. MySQL
Workbench es opcional.

  database/       Docker, esquema y datos MySQL
  backend/        API REST Node.js y Express
  foodtrans-nqr/  Interfaz React y Vite
  automation/     Pruebas Gradle, Serenity y Selenium

Abre PowerShell en la raíz del proyecto (la carpeta con esas cuatro carpetas).
Comprueba que Node/npm estén disponibles:
  node --version
  npm --version

2. CONFIGURACIÓN LOCAL
----------------------
Crea los archivos de entorno desde la raíz:
  Copy-Item .\database\.env.example .\database\.env
  Copy-Item .\backend\.env.example .\backend\.env
  Copy-Item .\foodtrans-nqr\.env.example .\foodtrans-nqr\.env

Si un .env ya existe, no lo sobrescribas. Los .env son configuración local y no
se suben a Git; los .env.example son plantillas. La conexión MySQL local
predeterminada del backend es host 127.0.0.1, puerto 3308, base foodtrans_nqr,
usuario foodtrans y contraseña foodtrans_dev. Si cambias el puerto MySQL,
actualiza DB_PORT en backend\.env.

3. INICIAR MYSQL
----------------
Abre Docker Desktop y espera a que esté listo. En PowerShell, desde la raíz:
  docker compose -f database\compose.yaml up -d
  docker compose -f database\compose.yaml ps

Espera a que mysql indique "Up" y "healthy". La base queda accesible en
127.0.0.1:3308 (puerto del contenedor 3306).

En la primera ejecución con volumen vacío, Compose aplica en orden:
  database/foodtrans_nqr_schema.sql
  database/foodtrans_nqr_seed.sql
  database/foodtrans_nqr_auth_movements.sql

Crean las tablas y datos iniciales. Solo se ejecutan cuando el volumen está
vacío; iniciar de nuevo conserva los datos y no repite la carga inicial.
Para ver logs: docker compose -f database\compose.yaml logs -f mysql
Pulsa Ctrl+C para salir de los logs sin detener MySQL.

4. INICIAR API Y PÁGINA
-----------------------
Deja MySQL ejecutándose. Abre una segunda PowerShell en la raíz:
  Set-Location .\backend
  npm install
  npm run dev

La API queda en el puerto 3001, con base http://localhost:3001/api. Deja abierta
la ventana; Ctrl+C la detiene.

Abre una tercera PowerShell en la raíz:
  Set-Location .\foodtrans-nqr
  npm install
  npm run dev

Vite mostrará la dirección local; normalmente es http://localhost:5173. Ábrela
en el navegador y deja abierta la terminal; Ctrl+C detiene la página.
Orden de inicio: Docker/MySQL, API y finalmente página.

5. VER LOS DATOS DE MYSQL
-------------------------
En MySQL Workbench crea una conexión con:
  Host: 127.0.0.1
  Port: 3308
  User: foodtrans
  Password: MYSQL_PASSWORD de database\.env
  Default Schema: foodtrans_nqr

También puedes usar:
  docker exec -it foodtrans-nqr-db mysql -ufoodtrans -p foodtrans_nqr

MySQL solicitará la contraseña. Consultas útiles:
  SHOW TABLES;
  SELECT id, full_name, email, role FROM app_users;
  SELECT id, movement_date, client_name, origin, destination
    FROM movements ORDER BY movement_date DESC;

password_hash almacena hashes; no compartas ese campo.

6. CUENTAS Y ARCHIVOS EN GIT
----------------------------
database/foodtrans_nqr_auth_movements.sql está versionado e incluye correos y
hashes de las cuentas iniciales, no sus contraseñas en texto legible.
ATENCIÓN: automation/README.md también está versionado y contiene correos y
contraseñas de prueba en texto legible. Si otras personas pueden ver el
repositorio, considera expuestas esas claves y cámbialas antes de usar las
cuentas fuera del entorno local. No copies contraseñas reales a este manual.

Las credenciales de acceso a FoodTrans son distintas a las de MySQL. Los seeds
no se vuelven a aplicar en una base ya inicializada: las cuentas efectivas
dependen de los datos que ya existan en el volumen. El administrador puede
crear cuentas cliente desde el apartado Clientes.

7. EJECUTAR AUTOMATIZACIÓN
--------------------------
Inicia primero base, API y página. En otra PowerShell:
  Set-Location .\automation
  .\gradlew.bat test

La primera vez Gradle descarga dependencias. Los reportes Serenity quedan en
automation\target\site\serenity. Los escenarios pueden crear clientes y
movimientos de prueba en MySQL.

En IntelliJ puedes ejecutar por separado los runners:
  src/test/java/co/com/foodtrans/automation/runners/AdminRunner.java
  src/test/java/co/com/foodtrans/automation/runners/ClientRunner.java
  src/test/java/co/com/foodtrans/automation/runners/FoodTransRegressionTest.java

Se requiere un ChromeDriver compatible. Si no está en PATH, configura la ruta
en esa PowerShell:
  $env:CHROMEDRIVER = 'C:\ruta\a\chromedriver.exe'

La automatización admite FOODTRANS_ADMIN_EMAIL, FOODTRANS_ADMIN_PASSWORD,
FOODTRANS_CLIENT_EMAIL y FOODTRANS_CLIENT_PASSWORD. Revisa automation/README.md
y evita subir contraseñas reales.

8. DETENER, REINICIAR Y BORRAR
------------------------------
Detener MySQL sin borrar datos:
  docker compose -f database\compose.yaml down

Reiniciar conservando datos:
  docker compose -f database\compose.yaml up -d

API y página se detienen con Ctrl+C en sus terminales.

BORRADO DEFINITIVO de usuarios, viajes y movimientos:
  docker compose -f database\compose.yaml down -v

Usa down -v solo para borrar la base local y empezar desde cero. Después ejecuta
up -d; al crearse un volumen vacío se aplicarán nuevamente los scripts SQL.

9. PROBLEMAS COMUNES
--------------------
- Docker no conecta: abre Docker Desktop y espera a que inicie.
- Puerto 3308 ocupado: libera el puerto o cambia MYSQL_PORT en database\.env y
  DB_PORT en backend\.env para que coincidan.
- La página no carga datos: revisa que MySQL y API estén activos y que
  foodtrans-nqr\.env apunte a http://localhost:3001/api.
- API no conecta: revisa DB_HOST, DB_PORT, DB_NAME, DB_USER y DB_PASSWORD en
  backend\.env; consulta docker compose ps.
- Usuarios de inicio no coinciden: el volumen puede tener datos anteriores;
  los scripts de inicialización no se ejecutan otra vez.

Más información: database/README.md, backend/README.md y automation/README.md.
