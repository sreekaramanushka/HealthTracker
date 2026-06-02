const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['Steps', 'Water', 'Sleep', 'Weight', 'Calories'],
        required: true,
    },
    target: {
        type: Number,
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);
