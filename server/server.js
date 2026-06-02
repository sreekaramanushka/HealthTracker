const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins for Vercel Serverless

// Route files
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const waterRoutes = require('./routes/waterRoutes');
const sleepRoutes = require('./routes/sleepRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const goalRoutes = require('./routes/goalRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
    res.send('GoFit API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Required for Vercel Serverless Deployment
module.exports = app;
