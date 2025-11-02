
import React from 'react';
import { Theme } from '../../types';

interface AdminNavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onLogout: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ theme, toggleTheme, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">
        Admin Dashboard
      </h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} w-5 h-5`} aria-hidden="true"></i>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <i className="fas fa-sign-out-alt fa-fw mr-2" aria-hidden="true"></i>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
