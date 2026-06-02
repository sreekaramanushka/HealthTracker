const express = require('express');
const router = express.Router();
const { getSleepLogs, setSleepLog } = require('../controllers/sleepController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSleepLogs).post(protect, setSleepLog);

module.exports = router;
