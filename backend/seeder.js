
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import Tour from './models/Tour.js';
import TourBooking from './models/TourBooking.js';
import AirportBooking from './models/AirportBooking.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read JSON file
const readJsonFile = (filePath) => {
  const data = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  return JSON.parse(data);
};

const importData = async () => {
    await connectDB();
    try {
        // Clear existing data
        await Tour.deleteMany();
        await TourBooking.deleteMany();
        await AirportBooking.deleteMany();
        await User.deleteMany();

        // Load data from JSON files
        const tours = readJsonFile('/data/tours.json');
        const reviews = readJsonFile('/data/reviews.json');

        // Combine reviews with tours
        const toursWithReviews = tours.map(tour => {
            return {
                ...tour,
                reviews: reviews.filter(review => review.tourId === tour.id)
            };
        });
        
        // Create admin user
        await User.create({
            username: 'admin',
            password: 'admin', // Password will be hashed by the model middleware
        });

        // Insert new data
        await Tour.insertMany(toursWithReviews);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();
    try {
        await Tour.deleteMany();
        await TourBooking.deleteMany();
        await AirportBooking.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
