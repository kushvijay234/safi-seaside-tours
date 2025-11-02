
import React, { useState, useEffect, useRef } from 'react';
import { Tour, Review, Page } from '../types';
import TourDetailView from './TourDetail';
import SkeletonCard from '../components/SkeletonCard';

// The summary card for the catalog view
interface TourSummaryCardProps {
  tour: Tour;
  onViewDetails: (tour: Tour) => void;
}

const TourSummaryCard: React.FC<TourSummaryCardProps> = ({ tour, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img src={tour.image} alt={tour.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">{tour.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{tour.duration}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-ocean-blue">${tour.price}{tour.id === 4 ? '+' : ''}</span>
          <button onClick={() => onViewDetails(tour)} className="bg-ocean-blue text-white px-4 py-2 rounded-full hover:bg-ocean-blue-dark transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};


// BookingModal component
interface BookingModalProps {
  tour: Tour;
  details: {
    date: string;
    passengers: number;
    requests: string;
    email: string;
  };
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ tour, details, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
        
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
          }
      } else { // Tab
          if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
          }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formattedDate = new Date(details.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn" onClick={onClose}>
      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="booking-confirmation-title" className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 sm:p-8 max-w-md w-full transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
            <div className="text-center sm:text-left">
              <h3 id="booking-confirmation-title" className="text-2xl leading-6 font-bold text-ocean-blue-dark dark:text-ocean-blue-light">
                <i className="fas fa-check-circle mr-3 text-green-500" aria-hidden="true"></i>
                Request Sent!
              </h3>
              <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
                We'll contact you shortly to confirm availability and finalize your booking.
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <span className="sr-only">Close</span>
              <i className="fas fa-times text-2xl" aria-hidden="true"></i>
            </button>
        </div>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">Your Request Summary</h4>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Tour:</dt>
                <dd className="font-medium text-gray-900 dark:text-white text-right">{tour.name}</dd>
              </div>
               <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Email:</dt>
                <dd className="font-medium text-gray-900 dark:text-white text-right">{details.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Date:</dt>
                <dd className="font-medium text-gray-900 dark:text-white text-right">{formattedDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Passengers:</dt>
                <dd className="font-medium text-gray-900 dark:text-white text-right">{details.passengers}</dd>
              </div>
              {details.requests && (
                 <div className="flex flex-col">
                  <dt className="text-gray-500 dark:text-gray-400">Requests:</dt>
                  <dd className="font-medium text-gray-900 dark:text-white mt-1 text-left">{details.requests}</dd>
                </div>
              )}
            </dl>
        </div>
        
        <div className="mt-8 text-right">
          <button onClick={onClose} className="bg-ocean-blue text-white font-bold py-2 px-6 rounded-full hover:bg-ocean-blue-dark transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToursProps {
  setCurrentPage: (page: Page) => void;
  tours: Tour[];
  onBookingSuccess: () => void;
}

const Tours: React.FC<ToursProps> = ({ setCurrentPage, tours, onBookingSuccess }) => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [bookingDetails, setBookingDetails] = useState<{ tour: Tour | null; date: string; passengers: number; requests: string; email: string }>({
    tour: null,
    date: '',
    passengers: 1,
    requests: '',
    email: '',
  });

  const handleBookNow = async (tour: Tour, details: { date: string; passengers: number; requests: string; email: string }) => {
    setIsBooking(true);
    try {
      const bookingData = {
        tourId: tour.id,
        tourName: tour.name,
        ...details,
      };

      const response = await fetch('http://localhost:5000/api/bookings/tour', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.message || 'Failed to create booking');
      }

      onBookingSuccess(); // To refresh bookings in admin panel
      setBookingDetails({ tour, ...details });
      setIsModalOpen(true);

    } catch (error) {
      console.error("Failed to process booking:", error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
        setIsBooking(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getHoursFromDuration = (duration: string): number => {
    if (duration.toLowerCase().includes('varies')) {
      return NaN;
    }
    const match = duration.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : NaN;
  };

  const filteredTours = tours.filter(tour => {
    if (activeFilter === 'All') {
      return true;
    }
    const hours = getHoursFromDuration(tour.duration);
    if (isNaN(hours)) {
      return activeFilter === 'All';
    }
    if (activeFilter === 'Half-Day') {
      return hours <= 4;
    }
    if (activeFilter === 'Full-Day') {
      return hours > 4;
    }
    return false;
  });
  
  const handleFilterClick = (option: string) => {
    setIsLoading(true);
    setActiveFilter(option);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading
  };

  const filterOptions = ['All', 'Half-Day', 'Full-Day'];

  return (
    <div className="bg-off-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedTour ? (
          <TourDetailView 
            tour={selectedTour}
            onBook={handleBookNow}
            onBack={() => setSelectedTour(null)}
            setCurrentPage={setCurrentPage}
            isBooking={isBooking}
          />
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">Our Adventures</h2>
              <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
                Tours & Experiences
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                Choose from our curated tours or create your own custom adventure.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 my-12">
              {filterOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterClick(option)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === option
                      ? 'bg-ocean-blue text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-ocean-blue-dark dark:text-ocean-blue-light hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {option} Tours
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              ) : tours.length === 0 ? (
                 <div className="text-center py-12 col-span-full">
                  <p className="text-xl text-gray-600 dark:text-gray-400">Loading tours...</p>
                </div>
              ) : filteredTours.length > 0 ? (
                filteredTours.map(tour => (
                  <TourSummaryCard 
                    key={tour._id} 
                    tour={tour}
                    onViewDetails={setSelectedTour}
                  />
                ))
              ) : (
                <div className="text-center py-12 col-span-full">
                  <p className="text-xl text-gray-600 dark:text-gray-400">No tours match the selected filter.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isModalOpen && bookingDetails.tour && (
        <BookingModal 
          tour={bookingDetails.tour}
          details={{ date: bookingDetails.date, passengers: bookingDetails.passengers, requests: bookingDetails.requests, email: bookingDetails.email }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tours;
