# FoodTrans NQR

Proyecto React basado en el documento `Formato Plan de Negocio Modelo AJUSTADO 2026-1.docx`.

La aplicacion funciona como prototipo operativo para una empresa de transporte de alimentos en camiones tipo NQR. Incluye gestion de viajes, flota, conductores, documentos, reportes financieros, matriz de riesgos y una sintesis del plan de negocio.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Conexion con backend

El frontend intenta conectarse a:

```text
VITE_API_URL=http://localhost:3001/api
```

Puedes copiar `.env.example` a `.env` si necesitas cambiar la URL. Si el backend no esta disponible, la app sigue funcionando con `localStorage`.

## Estructura principal

```text
src/
|-- components/
|-- contexts/
|-- hooks/
|-- pages/
|-- routes/
|-- services/
|-- utils/
|-- App.jsx
|-- index.js
|-- main.jsx
```

## Modulos incluidos

- Panel de control con indicadores de viajes, ingresos, documentos y vehiculos.
- Gestion de viajes con formulario, estado operativo y tabla de servicios.
- Flota y conductores con control de disponibilidad.
- Documentos y evidencias asociados a cada viaje.
- Reportes con proyeccion financiera y matriz de riesgos.
- Plan de negocio resumido por secciones del formato SENA.

Los datos se sincronizan con el backend cuando esta disponible y se conservan en `localStorage` como respaldo.
