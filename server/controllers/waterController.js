const WaterIntake = require('../models/WaterIntake');

const getWaterLogs = async (req, res) => {
    try {
        const logs = await WaterIntake.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setWaterLog = async (req, res) => {
    try {
        const { amount, date } = req.body;
        const log = await WaterIntake.create({
            user: req.user.id,
            amount,
            date: date || Date.now()
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWaterLogs, setWaterLog };
