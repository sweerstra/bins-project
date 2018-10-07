const express = require('express');
const router = express.Router();
const binsController = require('../controllers/bins');
const usersController = require('../controllers/users');
const authController = require('../controllers/auth');
const { catchErrors } = require('../errorHandlers');

router.get('/bin/:id', catchErrors(binsController.getBin));
router.post('/bins', authController.verifyToken, catchErrors(binsController.addBin));
router.get('/bins', catchErrors(binsController.getBins));
router.put('/bin/:id', authController.verifyToken, catchErrors(binsController.editBin));
router.delete('/bin/:id', authController.verifyToken, catchErrors(binsController.removeBin));

router.get('/user', authController.verifyToken, catchErrors(usersController.getUser));
router.post('/user/verify', catchErrors(usersController.verifyUser));
router.post('/users', catchErrors(usersController.addUser));

module.exports = router;
