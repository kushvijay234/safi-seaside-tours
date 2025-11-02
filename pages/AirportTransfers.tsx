
import React, { useState } from 'react';
import { AirportTransferBooking } from '../types';

interface AirportTransfersProps {
  onBookingSuccess: () => void;
}

const AirportTransfers: React.FC<AirportTransfersProps> = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    flightNumber: '',
    pickupDate: '',
    passengers: '1',
    pickupLocation: 'YHZ Airport',
    dropoffLocation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/bookings/airport', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Failed to submit booking');
      }

      onBookingSuccess(); // Refresh bookings in parent component
      setSubmissionStatus('success');
      setFormData({
        name: '',
        email: '',
        flightNumber: '',
        pickupDate: '',
        passengers: '1',
        pickupLocation: 'YHZ Airport',
        dropoffLocation: '',
      });

    } catch (error) {
      console.error("Failed to submit airport transfer request:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

  return (
    <div className="py-16 sm:py-24 bg-off-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left Column: Information */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">Stress-Free Travel</h2>
            <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
              Private Airport Transfers
            </p>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Start and end your Nova Scotia journey with comfort and ease. We provide reliable, private transfers to and from Halifax Stanfield International Airport (YHZ) in our modern, spacious SUV.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-4">Why Book With Us?</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-ocean-blue dark:text-ocean-blue-light mt-1 mr-3" aria-hidden="true"></i>
                  <span><strong>Meet & Greet:</strong> Your driver will be waiting for you at arrivals, ready to assist with your luggage.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-ocean-blue dark:text-ocean-blue-light mt-1 mr-3" aria-hidden="true"></i>
                  <span><strong>Spacious Comfort:</strong> Plenty of room for up to 6 passengers and luggage in our premium SUV.</span>
                </li>
                 <li className="flex items-start">
                  <i className="fas fa-check-circle text-ocean-blue dark:text-ocean-blue-light mt-1 mr-3" aria-hidden="true"></i>
                  <span><strong>Fixed Pricing:</strong> No surprise fees. Our rates are transparent and competitive.</span>
                </li>
              </ul>
            </div>
             <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-2">Our Rates</h3>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                <strong>Halifax Downtown/Peninsula:</strong> $80
              </p>
               <p className="text-lg text-gray-700 dark:text-gray-200 mt-1">
                <strong>Dartmouth & Surrounding Area:</strong> $85 - $95
              </p>
              <p className="text-sm text-gray-500 mt-1">(Prices are one-way, tax included)</p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-6">Book Your Transfer</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputStyles} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputStyles} />
                </div>
              </div>
              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Flight Number (Arrival/Departure)</label>
                <input type="text" name="flightNumber" id="flightNumber" required value={formData.flightNumber} onChange={handleChange} className={inputStyles} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Date & Time</label>
                  <input type="datetime-local" name="pickupDate" id="pickupDate" required value={formData.pickupDate} onChange={handleChange} className={`${inputStyles} [color-scheme:light] dark:[color-scheme:dark]`} />
                </div>
                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Passengers</label>
                  <select name="passengers" id="passengers" required value={formData.passengers} onChange={handleChange} className={inputStyles}>
                    {[...Array(6).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>
               <div>
                  <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Location</label>
                  <input type="text" name="pickupLocation" id="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className={inputStyles} />
                </div>
                <div>
                  <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Drop-off Location</label>
                  <input type="text" name="dropoffLocation" id="dropoffLocation" required value={formData.dropoffLocation} onChange={handleChange} placeholder="e.g., Hotel Name, Address" className={inputStyles} />
                </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-ocean-blue hover:bg-ocean-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                      Submitting...
                    </>
                  ) : 'Submit Request'}
                </button>
              </div>
              <div role="alert" aria-live="assertive" className="text-center h-5">
                  {submissionStatus === 'success' && <p className="text-green-600 dark:text-green-400">Thank you! Your request has been sent.</p>}
                  {submissionStatus === 'error' && <p className="text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfers;
