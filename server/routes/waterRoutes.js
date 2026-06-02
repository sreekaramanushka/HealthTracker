const express = require('express');
const router = express.Router();
const { getWaterLogs, setWaterLog } = require('../controllers/waterController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getWaterLogs).post(protect, setWaterLog);

module.exports = router;
