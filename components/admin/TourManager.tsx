
import React, { useState } from 'react';
import { Tour } from '../../types';
import TourForm from './TourForm';
import { getAuthToken } from '../../utils/auth';

interface TourManagerProps {
    tours: Tour[];
    setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
}

const TourManager: React.FC<TourManagerProps> = ({ tours, setTours }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTour, setEditingTour] = useState<Tour | null>(null);
    const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenForm = (tour?: Tour) => {
        setEditingTour(tour || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setEditingTour(null);
        setIsFormOpen(false);
    };

    const handleSaveTour = async (tourData: Tour) => {
        setIsLoading(true);
        const token = getAuthToken();
        const method = tourData._id ? 'PUT' : 'POST';
        const url = tourData._id ? `http://localhost:5000/api/tours/${tourData._id}` : 'http://localhost:5000/api/tours';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tourData)
            });

            if (!response.ok) {
                throw new Error('Failed to save tour');
            }
            
            const savedTour = await response.json();

            if (tourData._id) {
                setTours(prevTours => prevTours.map(t => t._id === savedTour._id ? savedTour : t));
            } else {
                setTours(prevTours => [...prevTours, savedTour]);
            }
        } catch (error) {
            console.error("Error saving tour:", error);
        } finally {
            setIsLoading(false);
            handleCloseForm();
        }
    };

    const handleDeleteTour = async () => {
        if (tourToDelete) {
            setIsLoading(true);
            const token = getAuthToken();
            try {
                const response = await fetch(`http://localhost:5000/api/tours/${tourToDelete._id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete tour');
                }

                setTours(prevTours => prevTours.filter(t => t._id !== tourToDelete._id));
            } catch (error) {
                console.error("Error deleting tour:", error);
            } finally {
                setIsLoading(false);
                setTourToDelete(null);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">Manage Tours</h2>
                <button
                    onClick={() => handleOpenForm()}
                    className="bg-ocean-blue hover:bg-ocean-blue-dark text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    <i className="fas fa-plus mr-2"></i>Create New Tour
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tour Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {tours.map(tour => (
                            <tr key={tour._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={tour.image} alt={tour.name} className="h-10 w-16 object-cover rounded" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{tour.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-300">${tour.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-300">{tour.duration}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenForm(tour)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 mr-4">Edit</button>
                                    <button onClick={() => setTourToDelete(tour)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <TourForm
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                    onSave={handleSaveTour}
                    initialData={editingTour}
                />
            )}

            {tourToDelete && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold">Confirm Deletion</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete the "{tourToDelete.name}" tour? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button onClick={() => setTourToDelete(null)} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                            <button onClick={handleDeleteTour} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">{isLoading ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TourManager;
