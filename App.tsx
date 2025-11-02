
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import AirportTransfers from './pages/AirportTransfers';
import Gallery from './pages/Gallery';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import LoginModal from './components/LoginModal';
import { Page, Theme, Tour, TourBooking, AirportTransferBooking } from './types';
import { getAuthToken, setAuthToken } from './utils/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Check for path and token to determine initial admin view
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname === '/admin' && !!getAuthToken();
  });
  
  const [token, setToken] = useState<string | null>(getAuthToken());

  // Centralized state fetched from backend
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [tourBookings, setTourBookings] = useState<TourBooking[]>([]);
  const [airportBookings, setAirportBookings] = useState<AirportTransferBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const toursRes = await fetch(`${API_URL}/api/tours`);
      const toursData = await toursRes.json();
      setAllTours(toursData);

      if (isAdminView) {
        const tourBookingsRes = await fetch(`${API_URL}/api/bookings/tours`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const tourBookingsData = await tourBookingsRes.json();
        setTourBookings(tourBookingsData);
  
        const airportBookingsRes = await fetch(`${API_URL}/api/bookings/airport`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const airportBookingsData = await airportBookingsRes.json();
        setAirportBookings(airportBookingsData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdminView, token]);

  useEffect(() => {
    if (isAdminView) {
      document.title = 'Safi Seaside Tours | Admin';
    } else {
      document.title = `Safi Seaside Tours | ${currentPage}`;
    }
  }, [currentPage, isAdminView]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setIsAdminView(false);
    window.history.pushState({}, '', '/');
    setCurrentPage('Home');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSetCurrentPage = (page: Page) => {
    if (window.location.pathname === '/admin') {
      // Allow navigation away from admin, but don't log out
      window.history.pushState({}, '', '/');
      setIsAdminView(false);
    }
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  
  const refreshBookings = async () => {
     if (token) {
        const tourBookingsRes = await fetch(`${API_URL}/api/bookings/tours`, { headers: { 'Authorization': `Bearer ${token}` }});
        setTourBookings(await tourBookingsRes.json());
  
        const airportBookingsRes = await fetch(`${API_URL}/api/bookings/airport`, { headers: { 'Authorization': `Bearer ${token}` }});
        setAirportBookings(await airportBookingsRes.json());
     }
  };

  const renderPage = () => {
    if (isLoading && currentPage === 'Home') {
       return <div className="flex justify-center items-center h-screen"><p>Loading Safi Seaside Tours...</p></div>;
    }
    
    switch (currentPage) {
      case 'Home':
        return <Home setCurrentPage={handleSetCurrentPage} tours={allTours} />;
      case 'About':
        return <About />;
      case 'Tours':
        return <Tours setCurrentPage={handleSetCurrentPage} tours={allTours} onBookingSuccess={refreshBookings} />;
      case 'Airport Transfers':
        return <AirportTransfers onBookingSuccess={refreshBookings} />;
      case 'Gallery':
        return <Gallery />;
      case 'FAQ':
        return <Faq />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={handleSetCurrentPage} tours={allTours} />;
    }
  };
  
  if (isAdminView) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        <Admin
          tours={allTours}
          setTours={setAllTours}
          tourBookings={tourBookings}
          airportTransferBookings={airportBookings}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={handleSetCurrentPage} 
        theme={theme}
        toggleTheme={toggleTheme}
        isAdminView={isAdminView}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer setCurrentPage={handleSetCurrentPage} />

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(newToken) => {
            setIsLoginModalOpen(false);
            setAuthToken(newToken);
            setToken(newToken);
            setIsAdminView(true);
            window.history.pushState({}, 'Admin Panel', '/admin');
          }}
        />
      )}
    </div>
  );
};

export default App;
