import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
            Our Story: A Passion for Nova Scotia
          </p>
        </div>
        
        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div className="relative">
            <img 
              className="w-full rounded-2xl shadow-xl" 
              src="https://picsum.photos/seed/asif-safi/600/700" 
              alt="Asif Safi, founder of Safi Seaside Tours" 
            />
          </div>
          
          <div className="mt-10 lg:mt-0">
            <h3 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-4">A Message from Asif Safi</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              "Welcome! I'm Asif Safi, and I founded Safi Seaside Tours out of a deep love for my adopted home, Nova Scotia. After moving here, I was captivated by the stunning coastline, the rich history, and the warmth of the people. I started this company to share that magic with visitors in a personal and meaningful way."
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              "My goal is simple: to provide you with the best possible experience. That means no crowded buses, no rigid schedules. Just a friendly, knowledgeable guide, a comfortable vehicle, and an itinerary built around what you want to see and do. I believe a tour should feel like a day out with a local friend, and that’s the experience I strive to create for every guest."
            </p>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t dark:border-gray-700">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-4">Our Mission</h3>
            <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
              To offer exceptional, private tours that showcase the authentic beauty and culture of Nova Scotia, creating lasting memories for our guests through personalized service, local expertise, and a genuine passion for hospitality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;