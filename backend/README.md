# FoodTrans NQR Backend

API REST en Node.js y Express para la app React `foodtrans-nqr`.

## Comandos

```bash
npm install
npm run dev
npm run check
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta la conexion MySQL.

```text
PORT=3001
HOST=localhost
CORS_ORIGIN=http://127.0.0.1:5173
DB_NAME=foodtrans_nqr
DB_PORT=3308
```

La API usa `mysql2` para conectarse a MySQL 8.4. Aplica
`database/foodtrans_nqr_auth_movements.sql` en bases que ya existían antes de
agregar el login; la migración crea las tablas `app_users` y `movements` sin
borrar datos existentes.

## Acceso por roles

- Solo el administrador crea cuentas cliente desde el apartado **Clientes**.
- La pantalla de acceso solo permite iniciar sesión; la API protege el alta y
  el listado de clientes con el rol `admin`.
- El script `database/foodtrans_nqr_auth_movements.sql` crea las cuentas iniciales
  de cliente y administrador con contraseñas cifradas. No existe registro
  público de cuentas.

El formulario del cliente guarda los movimientos en MySQL. Administración
consulta todas las cuentas y la lista se actualiza cada 10 segundos.

## Endpoints

- `GET /api/data`
- `GET /api/clients`
- `GET /api/drivers`
- `GET /api/vehicles`
- `PATCH /api/vehicles/:id/status`
- `GET /api/trips`
- `POST /api/trips`
- `PATCH /api/trips/:id/status`
- `GET /api/documents`
- `POST /api/documents`
- `GET /api/reports`
- `GET /api/business-plan`
- `POST /api/auth/login`
- `GET /api/auth/me` (requiere token)
- `GET /api/admin/clients` (requiere rol admin)
- `POST /api/admin/clients` (requiere rol admin)
- `GET /api/movements` (requiere token; filtra por cliente)
- `POST /api/movements` (requiere rol cliente)

Los endpoints `GET` devuelven datos demo si la base de datos no esta disponible.
