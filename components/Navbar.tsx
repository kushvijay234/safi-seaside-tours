import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
  isAdminView?: boolean;
  openLoginModal: () => void;
}

const navLinks: Page[] = ['Home', 'About', 'Tours', 'Airport Transfers', 'Gallery', 'FAQ', 'Contact'];

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, theme, toggleTheme, isAdminView, openLoginModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };
  
  const scrolledOrNotHome = (isScrolled || currentPage !== 'Home') && !isAdminView;

  // Dynamic classes for navbar elements
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolledOrNotHome ? 'bg-ocean-blue-dark shadow-md' : 'bg-transparent'}`;
  
  const logoColor = scrolledOrNotHome ? 'text-white' : 'text-ocean-blue-dark dark:text-white';
  
  const linkColor = scrolledOrNotHome ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200';
  const hoverColor = scrolledOrNotHome ? 'hover:text-white' : 'hover:text-ocean-blue';
  
  const activeLinkStyle = scrolledOrNotHome ? 'text-white font-bold' : 'bg-ocean-blue text-white';
  
  const iconColor = scrolledOrNotHome ? 'text-gray-200' : 'text-ocean-blue-dark dark:text-white';
  const iconHoverColor = scrolledOrNotHome ? 'hover:text-white' : 'hover:text-ocean-blue';
  
  const mobileMenuBg = scrolledOrNotHome ? 'bg-ocean-blue-dark' : 'bg-white dark:bg-gray-800';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" onClick={(e) => handleNavClick(e, 'Home')} className={`font-bold text-2xl transition-colors ${logoColor}`}>
              Safi Seaside Tours
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === link 
                      ? activeLinkStyle
                      : `${linkColor} ${hoverColor}`
                  }`}
                >
                  {link}
                </a>
              ))}
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${iconColor} ${iconHoverColor}`} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} w-5 h-5`} aria-hidden="true"></i>
              </button>
              <button onClick={openLoginModal} className={`p-2 rounded-full transition-colors ${iconColor} ${iconHoverColor}`} aria-label="Admin Login">
                <i className="fas fa-user-circle w-5 h-5" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${iconColor} ${scrolledOrNotHome ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <i className="fas fa-times h-6 w-6" aria-hidden="true"></i>
              ) : (
                <i className="fas fa-bars h-6 w-6" aria-hidden="true"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`md:hidden ${mobileMenuBg}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => handleNavClick(e, link)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link
                    ? (scrolledOrNotHome ? 'bg-ocean-blue text-white' : 'bg-ocean-blue text-white')
                    : (scrolledOrNotHome ? 'text-gray-200 hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700')
                }`}
              >
                {link}
              </a>
            ))}
             <div className="px-3 pt-2">
                <button onClick={toggleTheme} className={`w-full flex items-center justify-center p-2 rounded-md ${scrolledOrNotHome ? 'text-gray-200 hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} mr-2`} aria-hidden="true"></i>
                    <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                </button>
            </div>
             <div className="px-3 pt-2">
                <button onClick={() => { setIsOpen(false); openLoginModal(); }} className={`w-full flex items-center justify-center p-2 rounded-md ${scrolledOrNotHome ? 'text-gray-200 hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <i className="fas fa-user-circle mr-2" aria-hidden="true"></i>
                    <span>Admin Login</span>
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;