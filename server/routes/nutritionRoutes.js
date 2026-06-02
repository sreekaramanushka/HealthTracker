const express = require('express');
const router = express.Router();
const { getNutritionLogs, setNutritionLog } = require('../controllers/nutritionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNutritionLogs).post(protect, setNutritionLog);

module.exports = router;
