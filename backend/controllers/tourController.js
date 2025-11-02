
import Tour from '../models/Tour.js';

// @desc    Fetch all tours
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single tour
// @route   GET /api/tours/:id
// @access  Public
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            res.json(tour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a tour
// @route   POST /api/tours
// @access  Private/Admin
const createTour = async (req, res) => {
    const { name, price, description, image, images, duration, additionalInfo } = req.body;
    
    // Find the highest existing 'id' and increment it
    const lastTour = await Tour.findOne().sort({ id: -1 });
    const newId = lastTour ? lastTour.id + 1 : 1;

    const tour = new Tour({
        id: newId,
        name,
        price,
        description,
        image,
        images,
        duration,
        additionalInfo,
    });

    try {
        const createdTour = await tour.save();
        res.status(201).json(createdTour);
    } catch (error) {
        res.status(400).json({ message: 'Error creating tour', error: error.message });
    }
};

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
const updateTour = async (req, res) => {
    const { name, price, description, image, images, duration, additionalInfo } = req.body;

    try {
        const tour = await Tour.findById(req.params.id);

        if (tour) {
            tour.name = name;
            tour.price = price;
            tour.description = description;
            tour.image = image;
            tour.images = images;
            tour.duration = duration;
            tour.additionalInfo = additionalInfo;
            
            const updatedTour = await tour.save();
            res.json(updatedTour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating tour', error: error.message });
    }
};


// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            await tour.deleteOne();
            res.json({ message: 'Tour removed' });
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get tour reviews
// @route   GET /api/tours/:id/reviews
// @access  Public
const getTourReviews = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            res.json(tour.reviews);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Create new review
// @route   POST /api/tours/:id/reviews
// @access  Public
const createTourReview = async (req, res) => {
    const { rating, comment, author, tourId } = req.body;
    try {
        const tour = await Tour.findById(req.params.id);

        if (tour) {
            const review = {
                author,
                rating: Number(rating),
                comment,
                tourId: Number(tourId),
            };

            tour.reviews.push(review);
            await tour.save();
            res.status(201).json(tour.reviews[tour.reviews.length - 1]); // return the new review
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error creating review', error: error.message });
    }
};


export {
    getTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
    getTourReviews,
    createTourReview
};
