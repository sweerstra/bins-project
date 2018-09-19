const express = require('express');
const router = express.Router();
const binsController = require('../controllers/bins');
const usersController = require('../controllers/users');
const { catchErrors } = require('../errorHandlers');

router.get('/bin/:id', catchErrors(binsController.getBin));
router.post('/bins', catchErrors(binsController.addBin));
router.get('/bins', catchErrors(binsController.getBins));
router.put('/bin/:id', catchErrors(binsController.editBin));
router.delete('/bin/:id', catchErrors(binsController.removeBin));

router.get('/users', catchErrors(usersController.getUsers));
router.post('/users', catchErrors(usersController.addUser));
router.post('/user/verify', catchErrors(usersController.verifyUser));

module.exports = router;
