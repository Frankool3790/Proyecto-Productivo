# FoodTrans NQR Database

Scripts MySQL para que el backend y el frontend usen las mismas entidades.

## Ejecutar con Docker

Requiere Docker Desktop con Docker Compose. Desde esta carpeta:

```bash
docker compose up -d
docker compose ps
```

MySQL queda disponible en `127.0.0.1:3308`. La primera inicializacion ejecuta
el esquema, los datos de ejemplo y `foodtrans_nqr_auth_movements.sql`, y guarda
los datos en el volumen `foodtrans_mysql_data`.

Para usar otras credenciales, copia `.env.example` como `.env` y edita sus
valores antes de iniciar el servicio. El usuario de la aplicacion por defecto
es `foodtrans` y su contrasena es `foodtrans_dev`; el puerto local es `3308`.
El archivo `.env` no debe compartirse.

Para detener MySQL sin borrar los datos:

```bash
docker compose down
```

Los scripts de inicializacion solo se ejecutan cuando el volumen esta vacio.
Para crear la base desde cero y eliminar sus datos actuales, usa
`docker compose down -v` y vuelve a ejecutar `docker compose up -d`.

### Conexion del backend local

Configura `backend/.env` con estos valores para conectarlo al contenedor:

```env
DB_HOST=127.0.0.1
DB_USER=foodtrans
DB_PASSWORD=foodtrans_dev
DB_NAME=foodtrans_nqr
DB_PORT=3308
```

## Orden recomendado

```sql
SOURCE database/foodtrans_nqr_schema.sql;
SOURCE database/foodtrans_nqr_seed.sql;
SOURCE database/foodtrans_nqr_auth_movements.sql;
```

## Tablas principales

- `clients`
- `drivers`
- `vehicles`
- `trips`
- `documents`
- `financial_projection`
- `risk_matrix`
- `app_users` (cuentas y roles)
- `movements` (radicados de clientes)

## Ver la base de datos

En MySQL Workbench crea una conexión con:

- Hostname: `127.0.0.1`
- Port: `3308`
- Default Schema: `foodtrans_nqr`
- Username y contraseña: los valores `DB_USER` y `DB_PASSWORD` de `backend/.env`.

Al conectarte, ejecuta consultas como:

```sql
SHOW TABLES;
SELECT id, full_name, email, role FROM app_users;
SELECT * FROM movements ORDER BY id DESC;
```

Las contraseñas se guardan cifradas en `password_hash`; no consultes ni
compartas ese campo.

Los archivos anteriores de `almasoft` quedan en la carpeta como referencia historica, pero FoodTrans usa los scripts `foodtrans_nqr_*`.
