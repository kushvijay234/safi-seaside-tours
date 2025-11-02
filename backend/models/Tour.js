
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    tourId: { type: Number, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });


const tourSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // base64 string
    images: { type: [String], required: true }, // array of base64 strings
    duration: { type: String, required: true },
    additionalInfo: {
        groupSize: { type: String, required: true },
        included: { type: [String], required: true },
        notIncluded: { type: [String], required: true },
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
