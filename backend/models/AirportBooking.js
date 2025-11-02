
import mongoose from 'mongoose';

const airportBookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    flightNumber: { type: String, required: true },
    pickupDate: { type: String, required: true },
    passengers: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const AirportBooking = mongoose.model('AirportBooking', airportBookingSchema);
export default AirportBooking;
