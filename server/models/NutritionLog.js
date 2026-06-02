const mongoose = require('mongoose');

const nutritionLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
