import TourBooking from '../models/TourBooking.js';
import AirportBooking from '../models/AirportBooking.js';

// @desc    Create new tour booking
// @route   POST /api/bookings/tour
// @access  Public
const createTourBooking = async (req, res) => {
    const { tourId, tourName, date, passengers, email, requests } = req.body;

    try {
        const booking = new TourBooking({
            tourId,
            tourName,
            date,
            passengers,
            email,
            requests,
        });

        const createdBooking = await booking.save();

        res.status(201).json({ booking: createdBooking });
    } catch (error) {
        res.status(400).json({ message: 'Error creating tour booking', error: error.message });
    }
};

// @desc    Create new airport transfer booking
// @route   POST /api/bookings/airport
// @access  Public
const createAirportBooking = async (req, res) => {
    const { name, email, flightNumber, pickupDate, passengers, pickupLocation, dropoffLocation } = req.body;

    try {
        const booking = new AirportBooking({
            name,
            email,
            flightNumber,
            pickupDate,
            passengers,
            pickupLocation,
            dropoffLocation,
        });

        const createdBooking = await booking.save();

        res.status(201).json({ booking: createdBooking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating airport booking', error: error.message });
    }
};


// @desc    Get all tour bookings
// @route   GET /api/bookings/tours
// @access  Private/Admin
const getTourBookings = async (req, res) => {
    try {
        const bookings = await TourBooking.find({}).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Get all airport bookings
// @route   GET /api/bookings/airport
// @access  Private/Admin
const getAirportBookings = async (req, res) => {
    try {
        const bookings = await AirportBooking.find({}).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export {
    createTourBooking,
    createAirportBooking,
    getTourBookings,
    getAirportBookings,
};