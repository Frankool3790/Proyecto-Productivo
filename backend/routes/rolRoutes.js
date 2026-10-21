const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/createRol',verifyToken,authorizeRoles(['Administrador']), rolController.register);
router.get('/Roles',verifyToken,authorizeRoles(['Administrador']), rolController.getAllRoles);
router.get('/rol/:id',verifyToken,authorizeRoles(['Administrador']),rolController.getRolById);
router.delete('/delete/:id',verifyToken,authorizeRoles(['Administrador']), rolController.getRolDelete);


module.exports=router;