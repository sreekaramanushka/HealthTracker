const mongoose = require('mongoose');

const waterIntakeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: [true, 'Please add water amount in ml'],
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('WaterIntake', waterIntakeSchema);
