const { query } = require('../../config/database');

const selectors = {
  clients: 'SELECT id, name, city, contact, plan FROM clients ORDER BY name',
  drivers: 'SELECT id, name, phone, license, status FROM drivers ORDER BY name',
  vehicles:
    'SELECT id, plate, type, capacity, status, DATE_FORMAT(next_maintenance, "%Y-%m-%d") AS nextMaintenance FROM vehicles ORDER BY plate',
  trips:
    'SELECT id, client_id AS clientId, vehicle_id AS vehicleId, driver_id AS driverId, route, product, DATE_FORMAT(departure, "%Y-%m-%d") AS departure, DATE_FORMAT(eta, "%Y-%m-%d") AS eta, status, invoice, value, priority, notes FROM trips ORDER BY departure DESC, id DESC',
  documents:
    'SELECT id, trip_id AS tripId, type, name, status, DATE_FORMAT(uploaded_at, "%Y-%m-%d") AS uploadedAt FROM documents ORDER BY uploaded_at DESC, id DESC',
};

async function list(resource) {
  if (!selectors[resource]) {
    const error = new Error('Recurso no soportado');
    error.status = 400;
    throw error;
  }

  return query(selectors[resource]);
}

async function getAllData() {
  const [clients, drivers, vehicles, trips, documents] = await Promise.all([
    list('clients'),
    list('drivers'),
    list('vehicles'),
    list('trips'),
    list('documents'),
  ]);

  return {
    clients,
    drivers,
    vehicles,
    trips,
    documents,
  };
}

async function createTrip(trip) {
  await query(
    `INSERT INTO trips
      (id, client_id, vehicle_id, driver_id, route, product, departure, eta, status, invoice, value, priority, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      trip.id,
      trip.clientId,
      trip.vehicleId,
      trip.driverId,
      trip.route,
      trip.product,
      trip.departure,
      trip.eta,
      trip.status || 'Programado',
      trip.invoice || 'Pendiente',
      Number(trip.value || 0),
      trip.priority || 'Normal',
      trip.notes || '',
    ],
  );

  return trip;
}

async function updateTripStatus(id, status) {
  await query('UPDATE trips SET status = ? WHERE id = ?', [status, id]);
  return { id, status };
}

async function createDocument(document) {
  await query(
    `INSERT INTO documents (id, trip_id, type, name, status, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      document.id,
      document.tripId,
      document.type,
      document.name,
      document.status || 'Cargado',
      document.uploadedAt,
    ],
  );

  return document;
}

async function updateVehicleStatus(id, status) {
  await query('UPDATE vehicles SET status = ? WHERE id = ?', [status, id]);
  return { id, status };
}

module.exports = {
  list,
  getAllData,
  createTrip,
  updateTripStatus,
  createDocument,
  updateVehicleStatus,
};
