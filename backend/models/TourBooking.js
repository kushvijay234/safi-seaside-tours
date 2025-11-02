
import mongoose from 'mongoose';

const tourBookingSchema = new mongoose.Schema({
    tourName: { type: String, required: true },
    tourId: { type: Number, required: true },
    date: { type: String, required: true },
    passengers: { type: Number, required: true },
    email: { type: String, required: true },
    requests: { type: String },
    bookingDate: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const TourBooking = mongoose.model('TourBooking', tourBookingSchema);
export default TourBooking;
