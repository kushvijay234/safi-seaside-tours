
import express from 'express';
import {
    createTourBooking,
    createAirportBooking,
    getTourBookings,
    getAirportBookings,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/tour').post(createTourBooking);
router.route('/airport').post(createAirportBooking);

router.route('/tours').get(protect, getTourBookings);
router.route('/airport').get(protect, getAirportBookings);

export default router;
