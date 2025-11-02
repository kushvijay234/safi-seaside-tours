import React from 'react';
import { TourBooking, AirportTransferBooking } from '../../types';

type Booking = TourBooking | AirportTransferBooking;

interface BookingViewerProps {
    title: string;
    bookings: Booking[];
}

const BookingViewer: React.FC<BookingViewerProps> = ({ title, bookings }) => {
    
    const isTourBooking = (booking: Booking): booking is TourBooking => 'tourName' in booking;

    const renderBookingRow = (booking: Booking) => {
        if (isTourBooking(booking)) {
            return (
                <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.tourName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(booking.date).toLocaleDateString('en-CA', {timeZone: 'UTC'})}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.passengers}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.bookingDate.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">{booking.requests || 'N/A'}</td>
                </tr>
            );
        }
        
        // It's an AirportTransferBooking
        const transfer = booking as AirportTransferBooking;
        return (
             <tr key={transfer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{transfer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transfer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(transfer.pickupDate).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transfer.flightNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transfer.passengers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transfer.dropoffLocation}</td>
            </tr>
        );
    };

    const tourHeaders = ["Tour Name", "Email", "Date", "Passengers", "Booking Time", "Requests"];
    const transferHeaders = ["Name", "Email", "Pickup Time", "Flight #", "Passengers", "Drop-off"];
    
    const headers = bookings.length > 0 && isTourBooking(bookings[0]) ? tourHeaders : transferHeaders;
    
    return (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-6">{title} ({bookings.length})</h2>
            {bookings.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No bookings to display.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                {headers.map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {bookings.slice().reverse().map(renderBookingRow)}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingViewer;
