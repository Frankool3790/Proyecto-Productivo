const express = require('express');
const logistics = require('../../controllers/foodtrans/logisticsController');
const reports = require('../../controllers/foodtrans/reportsController');
const auth = require('../../controllers/foodtrans/authController');
const movements = require('../../controllers/foodtrans/movementsController');
const { verifyToken, authorizeRoles } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'FoodTrans NQR API',
    resources: [
      '/api/data',
      '/api/clients',
      '/api/drivers',
      '/api/vehicles',
      '/api/trips',
      '/api/documents',
      '/api/reports',
      '/api/business-plan',
    ],
  });
});

router.post('/auth/login', auth.login);
router.get('/auth/me', verifyToken, auth.me);
router.get('/admin/clients', verifyToken, authorizeRoles(['admin']), auth.listClients);
router.post('/admin/clients', verifyToken, authorizeRoles(['admin']), auth.createClient);
router.patch('/admin/clients/:id', verifyToken, authorizeRoles(['admin']), auth.updateClient);

router.get('/data', verifyToken, authorizeRoles(['admin']), logistics.getAllData);
router.get('/clients', verifyToken, authorizeRoles(['admin']), logistics.listClients);
router.get('/drivers', verifyToken, authorizeRoles(['admin']), logistics.listDrivers);
router.get('/vehicles', verifyToken, authorizeRoles(['admin']), logistics.listVehicles);
router.patch('/vehicles/:id/status', verifyToken, authorizeRoles(['admin']), logistics.updateVehicleStatus);
router.get('/trips', verifyToken, authorizeRoles(['admin']), logistics.listTrips);
router.post('/trips', verifyToken, authorizeRoles(['admin']), logistics.createTrip);
router.patch('/trips/:id/status', verifyToken, authorizeRoles(['admin']), logistics.updateTripStatus);
router.get('/documents', verifyToken, authorizeRoles(['admin']), logistics.listDocuments);
router.post('/documents', verifyToken, authorizeRoles(['admin']), logistics.createDocument);
router.get('/reports', verifyToken, authorizeRoles(['admin']), reports.getReports);
router.get('/business-plan', verifyToken, authorizeRoles(['admin']), reports.getBusinessPlan);
router.get('/movements', verifyToken, authorizeRoles(['admin', 'client']), movements.list);
router.post('/movements', verifyToken, authorizeRoles(['client']), movements.create);

module.exports = router;
