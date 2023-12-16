// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/deneme', userController.deneme);

module.exports = router;
