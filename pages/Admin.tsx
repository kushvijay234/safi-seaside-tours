
import React, { useState } from 'react';
import { Tour, TourBooking, AirportTransferBooking, Theme } from '../types';
import TourManager from '../components/admin/TourManager';
import BookingViewer from '../components/admin/BookingViewer';
import AdminNavbar from '../components/admin/AdminNavbar';

interface AdminProps {
  tours: Tour[];
  setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
  tourBookings: TourBooking[];
  airportTransferBookings: AirportTransferBooking[];
  theme: Theme;
  toggleTheme: () => void;
  onLogout: () => void;
}

type AdminView = 'tours' | 'tourBookings' | 'airportBookings';

const Admin: React.FC<AdminProps> = (props) => {
  const [activeView, setActiveView] = useState<AdminView>('tours');

  const navItemClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 rounded-md transition-colors";
  const activeNavItemClasses = "bg-ocean-blue font-semibold";

  const renderActiveView = () => {
    switch (activeView) {
      case 'tours':
        return <TourManager tours={props.tours} setTours={props.setTours} />;
      case 'tourBookings':
        return <BookingViewer title="Tour Bookings" bookings={props.tourBookings} />;
      case 'airportBookings':
        return <BookingViewer title="Airport Transfer Bookings" bookings={props.airportTransferBookings} />;
      default:
        return <TourManager tours={props.tours} setTours={props.setTours} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col">
        <div>
            <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400">Safi Seaside Tours</p>
            </div>
            <nav className="px-4">
            <ul className="space-y-2">
                <li>
                <button onClick={() => setActiveView('tours')} className={`${navItemClasses} ${activeView === 'tours' ? activeNavItemClasses : ''} w-full`}>
                    <i className="fas fa-route fa-fw mr-3" aria-hidden="true"></i> Tour Management
                </button>
                </li>
                <li>
                <button onClick={() => setActiveView('tourBookings')} className={`${navItemClasses} ${activeView === 'tourBookings' ? activeNavItemClasses : ''} w-full`}>
                    <i className="fas fa-calendar-check fa-fw mr-3" aria-hidden="true"></i> Tour Bookings
                    {props.tourBookings.length > 0 && <span className="ml-auto bg-ocean-blue-light text-black text-xs font-bold px-2 py-0.5 rounded-full">{props.tourBookings.length}</span>}
                </button>
                </li>
                <li>
                <button onClick={() => setActiveView('airportBookings')} className={`${navItemClasses} ${activeView === 'airportBookings' ? activeNavItemClasses : ''} w-full`}>
                    <i className="fas fa-plane-departure fa-fw mr-3" aria-hidden="true"></i> Airport Transfers
                    {props.airportTransferBookings.length > 0 && <span className="ml-auto bg-ocean-blue-light text-black text-xs font-bold px-2 py-0.5 rounded-full">{props.airportTransferBookings.length}</span>}
                </button>
                </li>
            </ul>
            </nav>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar theme={props.theme} toggleTheme={props.toggleTheme} onLogout={props.onLogout} />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
