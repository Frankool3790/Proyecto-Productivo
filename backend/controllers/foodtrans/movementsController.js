const { query } = require('../../config/database');

const movementColumns = `
  id,
  id AS movementNo,
  DATE_FORMAT(movement_date, '%Y-%m-%d') AS movementDate,
  client_name AS clientName,
  owner_name AS ownerName,
  vehicle,
  trailer,
  origin,
  destination,
  manifest_number AS manifestNumber,
  mtu,
  third_party_freight AS thirdPartyFreight,
  third_party_connections AS thirdPartyConnections,
  advances,
  withholding,
  ica,
  retention_fopat AS retentionFopat,
  total_payable AS totalPayable,
  created_at AS createdAt`;

const amountFields = [
  'mtu', 'thirdPartyFreight', 'thirdPartyConnections', 'advances',
  'withholding', 'ica', 'retentionFopat', 'totalPayable',
];

function normalizeMovement(body) {
  const fields = {
    movementDate: String(body.movementDate || ''),
    clientName: String(body.clientName || '').trim(),
    ownerName: String(body.ownerName || '').trim(),
    vehicle: String(body.vehicle || '').trim(),
    trailer: String(body.trailer || '').trim(),
    origin: String(body.origin || '').trim(),
    destination: String(body.destination || '').trim(),
    manifestNumber: String(body.manifestNumber || '').trim(),
  };
  const requiredFields = ['movementDate', 'clientName', 'ownerName', 'vehicle', 'origin', 'destination', 'manifestNumber'];
  if (requiredFields.some((field) => !fields[field]) || !/^\d{4}-\d{2}-\d{2}$/.test(fields.movementDate)) {
    const error = new Error('Completa todos los datos del movimiento y revisa la fecha.');
    error.status = 400;
    throw error;
  }

  for (const field of amountFields) {
    const value = Number(body[field] || 0);
    if (!Number.isFinite(value) || value < 0 || value > 9999999999999) {
      const error = new Error(`El valor de ${field} no es válido.`);
      error.status = 400;
      throw error;
    }
    fields[field] = value;
  }
  return fields;
}

async function list(req, res, next) {
  try {
    const rows = req.user.role === 'admin'
      ? await query(`SELECT ${movementColumns} FROM movements ORDER BY movement_date DESC, id DESC`)
      : await query(`SELECT ${movementColumns} FROM movements WHERE user_id = ? ORDER BY movement_date DESC, id DESC`, [req.user.id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    if (req.user.role !== 'client') return res.status(403).json({ message: 'Solo los clientes pueden radicar movimientos.' });
    const movement = normalizeMovement(req.body);
    const result = await query(
      `INSERT INTO movements
        (user_id, movement_date, client_name, owner_name, vehicle, trailer, origin, destination,
         manifest_number, mtu, third_party_freight, third_party_connections, advances,
         withholding, ica, retention_fopat, total_payable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, movement.movementDate, movement.clientName, movement.ownerName, movement.vehicle,
        movement.trailer, movement.origin, movement.destination, movement.manifestNumber, movement.mtu,
        movement.thirdPartyFreight, movement.thirdPartyConnections, movement.advances,
        movement.withholding, movement.ica, movement.retentionFopat, movement.totalPayable],
    );
    const rows = await query(`SELECT ${movementColumns} FROM movements WHERE id = ?`, [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { list, create };
