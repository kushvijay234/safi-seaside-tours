import React from 'react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNavClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Safi Seaside Tours</h3>
            <p className="text-gray-300">Your private guide to the stunning sights of Halifax and Nova Scotia's South Shore.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'Home')} className="hover:text-ocean-blue-light transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'Tours')} className="hover:text-ocean-blue-light transition-colors">Tours & Experiences</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'FAQ')} className="hover:text-ocean-blue-light transition-colors">FAQ</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'Contact')} className="hover:text-ocean-blue-light transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Visit our Facebook page" className="text-gray-300 hover:text-white text-2xl"><i className="fab fa-facebook-square" aria-hidden="true"></i></a>
              <a href="#" aria-label="Visit our Instagram page" className="text-gray-300 hover:text-white text-2xl"><i className="fab fa-instagram-square" aria-hidden="true"></i></a>
              <a href="#" aria-label="Visit our TripAdvisor page" className="text-gray-300 hover:text-white text-2xl"><i className="fab fa-tripadvisor" aria-hidden="true"></i></a>
            </div>
             <p className="mt-4 text-gray-300">
                <a href="tel:+19021234567" className="hover:text-ocean-blue-light"><i className="fas fa-phone mr-2" aria-hidden="true"></i> (902) 123-4567</a>
            </p>
             <p className="mt-2 text-gray-300">
                <a href="mailto:info@safiseasidetours.com" className="hover:text-ocean-blue-light"><i className="fas fa-envelope mr-2" aria-hidden="true"></i> info@safiseasidetours.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Safi Seaside Tours. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;