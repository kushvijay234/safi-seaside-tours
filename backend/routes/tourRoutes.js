
import express from 'express';
import {
    getTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
    createTourReview,
    getTourReviews
} from '../controllers/tourController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getTours)
    .post(protect, createTour);

router.route('/:id')
    .get(getTourById)
    .put(protect, updateTour)
    .delete(protect, deleteTour);

router.route('/:id/reviews')
    .get(getTourReviews)
    .post(createTourReview);

export default router;
