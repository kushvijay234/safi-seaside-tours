import React, { useState, useEffect } from 'react';
import { Page, Testimonial, Tour } from '../types';
import { testimonials } from '../data/testimonials';
import { galleryImages } from '../data/gallery';
import SkeletonCard from '../components/SkeletonCard';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  tours: Tour[];
}

const TourCard: React.FC<{ tour: Tour, setCurrentPage: (page: Page) => void }> = ({ tour, setCurrentPage }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={tour.image} alt={tour.name} className="w-full h-56 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">{tour.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{tour.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-ocean-blue">${tour.price}{tour.id === 4 ? '+' : ''}</span>
                <button onClick={() => { setCurrentPage('Tours'); window.scrollTo(0,0); }} className="bg-ocean-blue text-white px-4 py-2 rounded-full hover:bg-ocean-blue-dark transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-ocean-blue-light bg-opacity-10 dark:bg-ocean-blue-dark dark:bg-opacity-20 p-6 rounded-lg shadow-md">
        <i className="fas fa-quote-left text-ocean-blue dark:text-ocean-blue-light text-2xl mb-4" aria-hidden="true"></i>
        <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
        <p className="font-bold text-ocean-blue-dark dark:text-ocean-blue-light">{testimonial.author}</p>
        <p className="text-gray-500 dark:text-gray-400">{testimonial.location}</p>
    </div>
);

const Home: React.FC<HomeProps> = ({ setCurrentPage, tours }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data for the tour cards
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/halifax-harbour/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Discover Nova Scotia's Beauty</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">Private, personalized tours of Halifax and the scenic South Shore.</p>
          <button onClick={() => {setCurrentPage('Tours'); window.scrollTo(0,0);}} className="bg-ocean-blue text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-ocean-blue-dark transition-transform transform hover:scale-105 duration-300">
            Explore Our Tours
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-off-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-4">Welcome to Safi Seaside Tours</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Your journey into the heart of Nova Scotia begins here. We are a family-owned private tour company dedicated to providing an intimate and unforgettable experience. Let us show you the hidden gems and iconic landmarks of our beautiful province, from the rugged coastlines to charming historic towns, all from the comfort of our private vehicle.
            </p>
        </div>
      </section>

      {/* Top Tours Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-ocean-blue-dark dark:text-ocean-blue-light mb-12">Our Most Popular Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              tours.slice(0, 3).map(tour => (
                  <TourCard key={tour.id} tour={tour} setCurrentPage={setCurrentPage} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-off-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-ocean-blue-dark dark:text-ocean-blue-light mb-12">What Our Guests Are Saying</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map(testimonial => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
              </div>
          </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-ocean-blue-dark dark:text-ocean-blue-light mb-12">Why Choose Safi Seaside Tours?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="p-6">
                    <div className="text-ocean-blue dark:text-ocean-blue-light text-5xl mb-4"><i className="fas fa-car" aria-hidden="true"></i></div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Private & Comfortable</h3>
                    <p className="text-gray-600 dark:text-gray-400">Enjoy the sights in a clean, modern SUV exclusively for your group of up to 6 people.</p>
                </div>
                <div className="p-6">
                    <div className="text-ocean-blue dark:text-ocean-blue-light text-5xl mb-4"><i className="fas fa-map-signs" aria-hidden="true"></i></div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Local Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your guide is a passionate local who will share stories and insights you won't find in guidebooks.</p>
                </div>
                <div className="p-6">
                    <div className="text-ocean-blue dark:text-ocean-blue-light text-5xl mb-4"><i className="fas fa-edit" aria-hidden="true"></i></div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fully Customizable</h3>
                    <p className="text-gray-600 dark:text-gray-400">We tailor the day to your interests. Spend more time where you love, skip what you don't.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-off-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-8">Moments from Our Tours</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.slice(0, 4).map(image => (
                  <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
                  </div>
              ))}
          </div>
          <button onClick={() => {setCurrentPage('Gallery'); window.scrollTo(0,0);}} className="mt-8 bg-ocean-blue text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-ocean-blue-dark transition-colors">
            View Full Gallery
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
