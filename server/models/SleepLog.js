const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: Number, // hours
        required: true,
    },
    quality: {
        type: String,
        enum: ['Poor', 'Fair', 'Good', 'Excellent'],
        default: 'Good',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('SleepLog', sleepLogSchema);
