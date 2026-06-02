const HealthLog = require('../models/HealthLog');

// @desc    Get health logs
// @route   GET /api/health
// @access  Private
const getHealthLogs = async (req, res) => {
    try {
        const logs = await HealthLog.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Set health log
// @route   POST /api/health
// @access  Private
const setHealthLog = async (req, res) => {
    try {
        const { steps, heartRate, energyLevel, date } = req.body;
        const log = await HealthLog.create({
            user: req.user.id,
            steps,
            heartRate,
            energyLevel,
            date: date || Date.now()
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update health log
// @route   PUT /api/health/:id
// @access  Private
const updateHealthLog = async (req, res) => {
    try {
        const log = await HealthLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        if (log.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        const updatedLog = await HealthLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete health log
// @route   DELETE /api/health/:id
// @access  Private
const deleteHealthLog = async (req, res) => {
    try {
        const log = await HealthLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        if (log.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await log.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHealthLogs, setHealthLog, updateHealthLog, deleteHealthLog };
