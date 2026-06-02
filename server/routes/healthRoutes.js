const express = require('express');
const router = express.Router();
const { getHealthLogs, setHealthLog, updateHealthLog, deleteHealthLog } = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHealthLogs).post(protect, setHealthLog);
router.route('/:id').put(protect, updateHealthLog).delete(protect, deleteHealthLog);

module.exports = router;
