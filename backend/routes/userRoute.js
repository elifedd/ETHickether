// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/payment', userController.IsPayed);

module.exports = router;
