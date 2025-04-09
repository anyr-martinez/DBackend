const express = require('express');
const router = express.Router();
const dashboardController = require('../controlador/dashboardControlador');

router.get('/:role', dashboardController.getDashboardByRole);

module.exports = router;
