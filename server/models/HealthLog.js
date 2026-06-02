const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    steps: {
        type: Number,
        default: 0,
    },
    heartRate: {
        type: Number, // bpm
    },
    energyLevel: {
        type: Number, // 1-100%
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
