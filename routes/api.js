var express = require('express');
var router = express.Router();

//Modules/Service routers
var authService = require('../services/authService');
var authRouter = require('./authRoute');
var patientRouter = require('./patientsRoute');
var userRouter = require('./usersRoute');


//Authentication
router.use('/auth', authRouter)

//Validate the token
router.use(authService.verifyToken)

//User module (CRUD)
router.use('/users', userRouter);

//Patient module (CRUD)
router.use('/patient', patientRouter);

module.exports = router;