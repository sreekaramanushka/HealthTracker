const SleepLog = require('../models/SleepLog');

const getSleepLogs = async (req, res) => {
    try {
        const logs = await SleepLog.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setSleepLog = async (req, res) => {
    try {
        const { duration, quality, date } = req.body;
        const log = await SleepLog.create({
            user: req.user.id,
            duration,
            quality,
            date: date || Date.now()
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSleepLogs, setSleepLog };
