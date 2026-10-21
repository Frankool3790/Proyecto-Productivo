const model = require('../../models/foodtrans/foodtransModel');
const { logisticsData } = require('../../data/foodtransSeed');

function withFallback(resource, handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req);
      res.json(result);
    } catch (error) {
      if (error.code || error.errno) {
        res.json(logisticsData[resource] || logisticsData);
        return;
      }

      next(error);
    }
  };
}

const getAllData = withFallback('all', () => model.getAllData());
const listClients = withFallback('clients', () => model.list('clients'));
const listDrivers = withFallback('drivers', () => model.list('drivers'));
const listVehicles = withFallback('vehicles', () => model.list('vehicles'));
const listTrips = withFallback('trips', () => model.list('trips'));
const listDocuments = withFallback('documents', () => model.list('documents'));

async function createTrip(req, res, next) {
  try {
    const trip = await model.createTrip(req.body);
    res.status(201).json(trip);
  } catch (error) {
    if (error.code || error.errno) {
      res.status(201).json(req.body);
      return;
    }

    next(error);
  }
}

async function updateTripStatus(req, res, next) {
  try {
    const result = await model.updateTripStatus(req.params.id, req.body.status);
    res.json(result);
  } catch (error) {
    if (error.code || error.errno) {
      res.json({ id: req.params.id, status: req.body.status });
      return;
    }

    next(error);
  }
}

async function createDocument(req, res, next) {
  try {
    const document = await model.createDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    if (error.code || error.errno) {
      res.status(201).json(req.body);
      return;
    }

    next(error);
  }
}

async function updateVehicleStatus(req, res, next) {
  try {
    const result = await model.updateVehicleStatus(req.params.id, req.body.status);
    res.json(result);
  } catch (error) {
    if (error.code || error.errno) {
      res.json({ id: req.params.id, status: req.body.status });
      return;
    }

    next(error);
  }
}

module.exports = {
  getAllData,
  listClients,
  listDrivers,
  listVehicles,
  listTrips,
  listDocuments,
  createTrip,
  updateTripStatus,
  createDocument,
  updateVehicleStatus,
};
