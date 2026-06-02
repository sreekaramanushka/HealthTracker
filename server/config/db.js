const mongoose = require('mongoose');

// Global cache for connection promise to reuse across serverless invocations
let cachedPromise = null;

const connectDB = async () => {
    // If mongoose is already connected, reuse the active connection
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // If there is no connection attempt in progress, start one
    if (!cachedPromise) {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is missing');
        }

        console.log('Connecting to MongoDB Atlas...');
        
        cachedPromise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
        }).then((mongooseInstance) => {
            console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
            return mongooseInstance.connection;
        }).catch((error) => {
            cachedPromise = null; // Clear cache on failure so next request can retry
            console.error(`Database Connection Error: ${error.message}`);
            throw error;
        });
    }

    return cachedPromise;
};

module.exports = connectDB;
