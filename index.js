const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./Routes/userRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI and port from environment variables
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

// Check if mongoUri is present
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is missing");
}

// Mounting the user routes
app.use('/api/users', userRoutes);

async function connectMongoDb(){
   try {
        // Connecting to MongoDB database
        await mongoose.connect(mongoUri);
        console.log('MongoDB connection is successful');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
   } catch(error) {
        console.error('Error connecting to MongoDB:', error);
   }
}

connectMongoDb();
