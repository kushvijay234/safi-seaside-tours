
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Tour, Review, Page } from '../types';

// StarRating component for displaying and setting ratings
const StarRating: React.FC<{ rating: number; onSetRating?: (rating: number) => void }> = ({ rating, onSetRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarKeyDown = (e: KeyboardEvent<HTMLButtonElement>, star: number) => {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextStar = Math.min(5, star + 1);
        const nextButton = e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[aria-label^="${nextStar} star"]`);
        nextButton?.focus();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevStar = Math.max(1, star - 1);
        const prevButton = e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[aria-label^="${prevStar} star"]`);
        prevButton?.focus();
    }
  };

  // Display-only version
  if (!onSetRating) {
    return (
      <div className="flex items-center" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
            aria-hidden="true"
          ></i>
        ))}
      </div>
    );
  }

  // Interactive version for forms
  return (
    <div role="group" aria-label="Set your rating" className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`bg-transparent border-none p-0 cursor-pointer text-xl ${
            (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'
          } transition-colors`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          aria-pressed={rating >= star}
          onClick={() => onSetRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onKeyDown={(e) => handleStarKeyDown(e, star)}
        >
          <i className="fas fa-star" aria-hidden="true"></i>
        </button>
      ))}
    </div>
  );
};


// Props for the detailed tour view
interface TourDetailViewProps {
  tour: Tour;
  onBook: (tour: Tour, details: { date: string, passengers: number, requests: string, email: string }) => void;
  onBack: () => void;
  setCurrentPage: (page: Page) => void;
  isBooking: boolean;
}

// This is the detailed view for a single tour
const TourDetailView: React.FC<TourDetailViewProps> = ({ tour, onBook, onBack, setCurrentPage, isBooking }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [requests, setRequests] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ date: '', email: '' });
  
  const [newReview, setNewReview] = useState({ author: '', rating: 0, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const [activeImage, setActiveImage] = useState(tour.images[0] || tour.image);
  const [activeTab, setActiveTab] = useState('description');
  
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${tour._id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    if (tour._id) {
        fetchReviews();
    }
    // Set initial active image safely
    if (tour.images && tour.images.length > 0) {
        setActiveImage(tour.images[0]);
    } else {
        setActiveImage(tour.image);
    }
  }, [tour._id, tour.images, tour.image]);


  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of the day

  const validateForm = () => {
    const newErrors = { date: '', email: '' };
    let isValid = true;

    // Date validation
    if (!date) {
      newErrors.date = 'Please select a date.';
      isValid = false;
    } else {
        const selectedDate = new Date(date);
        const userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
        if ((selectedDate.getTime() + userTimezoneOffset) < today.getTime()) {
           newErrors.date = 'Date cannot be in the past.';
           isValid = false;
        }
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Please enter your email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email format.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onBook(tour, { date, passengers, requests, email });

    setDate('');
    setPassengers(1);
    setRequests('');
    setEmail('');
    setErrors({ date: '', email: '' });
  };
  
  const handlePassengerChange = (amount: number) => {
    setPassengers(prev => {
        const newAmount = prev + amount;
        if (newAmount >= 1 && newAmount <= 6) {
            return newAmount;
        }
        return prev;
    });
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author && newReview.rating > 0 && newReview.comment) {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${tour._id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newReview, tourId: tour.id })
        });
        if (!response.ok) throw new Error("Failed to submit review");
        const addedReview = await response.json();
        setReviews(prev => [...prev, addedReview]);
        setNewReview({ author: '', rating: 0, comment: '' });
        setReviewSubmitted(true);
        setTimeout(() => setReviewSubmitted(false), 3000);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
    : 0;
    
  const formInputStyles = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
  const tabButtonStyles = "px-4 py-3 font-semibold transition-colors duration-200 focus:outline-none rounded-t-md";
  const activeTabStyles = "border-b-2 border-ocean-blue text-ocean-blue dark:text-ocean-blue-light";
  const inactiveTabStyles = "text-gray-500 dark:text-gray-400 hover:text-ocean-blue-dark dark:hover:text-ocean-blue-light";

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'info', label: 'Additional Information' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
  ];

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (index + 1) % tabs.length;
          tabRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = (index - 1 + tabs.length) % tabs.length;
          tabRefs.current[prevIndex]?.focus();
      }
  };
  
  const dateErrorId = `date-error-${tour.id}`;
  const emailErrorId = `email-error-${tour.id}`;

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="mb-8 text-ocean-blue dark:text-ocean-blue-light hover:underline font-semibold">
        <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>Back to All Tours
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden border dark:border-gray-700">
            <img src={activeImage} alt={`Main view of ${tour.name}`} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-4">
            {tour.images.map((img, index) => (
              <button key={index} onClick={() => setActiveImage(img)} className={`rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue ${activeImage === img ? 'ring-2 ring-ocean-blue' : ''}`} aria-label={`View image ${index + 1} of ${tour.name}`}>
                <img src={img} alt={`${tour.name} thumbnail ${index + 1}`} className="w-full h-16 sm:h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Tour Details & Booking Form */}
        <div className="flex flex-col">
          <h3 className="text-3xl md:text-4xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">{tour.name}</h3>
          <div className="flex items-center my-4">
             {reviews.length > 0 && <StarRating rating={averageRating} />}
             <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">({reviews.length} customer review{reviews.length !== 1 && 's'})</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6">${tour.price}{tour.id === 4 ? ' (starting)' : ''}</p>
          
          <div className="mt-auto p-6 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Book Your Tour</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor={`date-${tour.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input type="date" id={`date-${tour.id}`} name="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={e => setDate(e.target.value)} className={`${formInputStyles} [color-scheme:light] dark:[color-scheme:dark]`} aria-invalid={!!errors.date} aria-describedby={errors.date ? dateErrorId : undefined} />
                        {errors.date && <p id={dateErrorId} className="text-red-500 text-sm mt-1" role="alert">{errors.date}</p>}
                    </div>
                    <div>
                      <label htmlFor={`email-${tour.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input type="email" id={`email-${tour.id}`} name="email" value={email} onChange={e => setEmail(e.target.value)} className={formInputStyles} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? emailErrorId : undefined} />
                      {errors.email && <p id={emailErrorId} className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>}
                    </div>
                </div>
                 <div>
                  <label htmlFor={`passengers-${tour.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Passengers</label>
                   <div className="flex items-center mt-1">
                      <button type="button" onClick={() => handlePassengerChange(-1)} aria-label="Decrease passenger count" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-700">-</button>
                      <input type="text" id={`passengers-${tour.id}`} name="passengers" readOnly value={passengers} className={`${formInputStyles} !mt-0 !rounded-none text-center w-16`} aria-live="polite" />
                      <button type="button" onClick={() => handlePassengerChange(1)} aria-label="Increase passenger count" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
                   </div>
                </div>
                <div>
                    <label htmlFor={`requests-${tour.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Special Requests (optional)</label>
                    <textarea id={`requests-${tour.id}`} name="requests" rows={2} value={requests} onChange={e => setRequests(e.target.value)} placeholder="e.g., dietary needs, accessibility" className={formInputStyles}></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isBooking}
                  className="w-full bg-ocean-blue text-white font-bold py-3 px-6 rounded-full hover:bg-ocean-blue-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isBooking ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                      Processing...
                    </>
                  ) : (
                    'Book Now'
                  )}
                </button>
                 <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                      Have specific questions?{' '}
                      <a 
                          href="#" 
                          onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage('Contact');
                              window.scrollTo(0, 0);
                          }} 
                          className="font-semibold text-ocean-blue hover:underline"
                      >
                          Contact Us
                      </a>.
                  </p>
            </form>
          </div>
        </div>

        {/* Bottom Section: Tabs */}
        <div className="md:col-span-2 mt-8 md:mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
             <div role="tablist" aria-label="Tour Information" className="-mb-px flex flex-wrap space-x-6">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        ref={(el) => { if(el) tabRefs.current[index] = el; }}
                        id={`tab-${tour.id}-${tab.id}`}
                        role="tab"
                        aria-controls={`tabpanel-${tour.id}-${tab.id}`}
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        onKeyDown={(e) => handleTabKeyDown(e, index)}
                        className={`${tabButtonStyles} ${activeTab === tab.id ? activeTabStyles : inactiveTabStyles}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div role="tabpanel" id={`tabpanel-${tour.id}-description`} aria-labelledby={`tab-${tour.id}-description`} className="prose dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300 animate-fadeIn">
                <p>{tour.description}</p>
              </div>
            )}
            {activeTab === 'info' && (
              <div role="tabpanel" id={`tabpanel-${tour.id}-info`} aria-labelledby={`tab-${tour.id}-info`} className="animate-fadeIn">
                 <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">Duration:</div>
                    <div className="text-gray-600 dark:text-gray-400">{tour.duration}</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">Group Size:</div>
                    <div className="text-gray-600 dark:text-gray-400">{tour.additionalInfo.groupSize}</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200 col-span-full sm:col-span-1">Included:</div>
                    <div className="text-gray-600 dark:text-gray-400 col-span-full sm:col-span-1">
                        <ul className="list-disc list-inside space-y-1">
                            {tour.additionalInfo.included.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                     <div className="font-semibold text-gray-800 dark:text-gray-200 col-span-full sm:col-span-1">Not Included:</div>
                    <div className="text-gray-600 dark:text-gray-400 col-span-full sm:col-span-1">
                        <ul className="list-disc list-inside space-y-1">
                            {tour.additionalInfo.notIncluded.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </dl>
              </div>
            )}
            {activeTab === 'reviews' && (
               <div role="tabpanel" id={`tabpanel-${tour.id}-reviews`} aria-labelledby={`tab-${tour.id}-reviews`} className="animate-fadeIn">
                    <div className="space-y-6 max-h-96 overflow-y-auto pr-4 mb-6">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                            <div key={review._id} className="border-b dark:border-gray-700 pb-4">
                                <div className="flex items-center mb-1">
                                <StarRating rating={review.rating} />
                                <p className="ml-4 font-semibold text-gray-800 dark:text-gray-200">{review.author}</p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic">"{review.comment}"</p>
                            </div>
                            ))
                        ) : <p className="text-gray-500 dark:text-gray-400">Be the first to review this tour!</p>}
                    </div>
                    <div className="mt-8 pt-6 border-t dark:border-gray-600">
                        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Leave a Review</h5>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`review-author-${tour.id}`} className="block text-sm font-medium">Your Name</label>
                                    <input type="text" id={`review-author-${tour.id}`} name="author" value={newReview.author} onChange={handleReviewChange} required aria-required="true" className={formInputStyles} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Your Rating</label>
                                    <div className="mt-1">
                                        <StarRating rating={newReview.rating} onSetRating={handleRatingChange} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor={`review-comment-${tour.id}`} className="block text-sm font-medium">Your Review</label>
                                <textarea id={`review-comment-${tour.id}`} name="comment" value={newReview.comment} onChange={handleReviewChange} required aria-required="true" rows={3} className={formInputStyles}></textarea>
                            </div>
                            <div role="alert" aria-live="polite" className="h-5">
                                {reviewSubmitted && <p className="text-green-600 dark:text-green-400">Thank you for your review!</p>}
                            </div>
                            <button type="submit" className="bg-ocean-blue-dark text-white font-semibold py-2 px-5 rounded-full hover:bg-ocean-blue transition-colors">Submit Review</button>
                        </form>
                    </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailView;
