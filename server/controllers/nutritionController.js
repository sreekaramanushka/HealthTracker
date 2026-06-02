const NutritionLog = require('../models/NutritionLog');

const getNutritionLogs = async (req, res) => {
    try {
        const logs = await NutritionLog.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setNutritionLog = async (req, res) => {
    try {
        const { mealType, calories, protein, carbs, fat, date } = req.body;
        const log = await NutritionLog.create({
            user: req.user.id,
            mealType,
            calories,
            protein,
            carbs,
            fat,
            date: date || Date.now()
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNutritionLogs, setNutritionLog };
