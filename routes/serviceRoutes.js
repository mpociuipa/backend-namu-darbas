const express = require('express');
const router = express.Router();
const serviceController = require('./../controllers/serviceController');
const authController = require('../controllers/authController');
const repairmanRouter = require("./repairmanRoutes");

router.use(authController.protect); //protect all routes

router.route('/')
.get(authController.restrictTo('admin'),serviceController.getAllServices)
.post(serviceController.createService)

router.route('/:id')
.get(serviceController.getServiceById)
.patch(serviceController.updateService)
.delete(serviceController.deleteService)

router.use('/:serviceId/repairmans',repairmanRouter)

module.exports = router;