const mongoose = require('mongoose');

// Global cache for connection to reuse across serverless invocations
let cachedConnection = null;

const connectDB = async () => {
    // If a connection is already established, reuse it
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing from environment variables');
        }

        console.log('Connecting to MongoDB Atlas...');
        
        // Connect to MongoDB without buffering commands
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
        });

        cachedConnection = conn;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Do NOT use process.exit(1) in Vercel serverless environment as it crashes the worker.
        // Instead, throw the error so that Express handles it or the request fails gracefully.
        throw error;
    }
};

module.exports = connectDB;
