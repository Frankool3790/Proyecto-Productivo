# Proyecto-Productivo 2026

## FoodTrans NQR

Proyecto productivo dividido en tres carpetas:

- `foodtrans-nqr`: frontend React/Vite.
- `backend`: API REST Express para FoodTrans NQR.
- `database`: scripts MySQL de esquema y datos iniciales.

## Ejecucion local

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd foodtrans-nqr
npm install
npm run dev
```

Base de datos:

```sql
SOURCE database/foodtrans_nqr_schema.sql;
SOURCE database/foodtrans_nqr_seed.sql;
SOURCE database/foodtrans_nqr_auth_movements.sql;
```

Para levantar MySQL con Docker: `cd database` y ejecuta `docker compose up -d`.
Quedará publicado en `localhost:3308`. La API usa las variables `DB_*` de
`backend/.env` y corre en `http://localhost:3001/api`.

La API corre por defecto en `http://localhost:3001/api` y el frontend en `http://127.0.0.1:5173`.
