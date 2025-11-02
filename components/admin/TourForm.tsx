
import React, { useState, useEffect } from 'react';
import { Tour } from '../../types';

interface TourFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tour: Tour) => void;
    initialData?: Tour | null;
}

const initialTourState: Tour = {
    _id: '',
    id: 0,
    name: '',
    price: 100,
    description: '',
    image: '',
    images: [],
    duration: '',
    additionalInfo: {
        groupSize: 'Up to 6 passengers',
        included: ['Private transportation'],
        notIncluded: ['Meals'],
    },
};

// Helper function to convert file to base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const TourForm: React.FC<TourFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [tour, setTour] = useState<Tour>(initialData || initialTourState);

    useEffect(() => {
        setTour(initialData || initialTourState);
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTour(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTour(prev => ({
            ...prev,
            additionalInfo: { ...prev.additionalInfo, [name]: value }
        }));
    };
    
    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'included' | 'notIncluded') => {
        const { value } = e.target;
        setTour(prev => ({
            ...prev,
            additionalInfo: { ...prev.additionalInfo, [field]: value.split('\n').filter(line => line.trim() !== '') }
        }));
    };

    const handlePrimaryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await toBase64(file);
            setTour(prev => ({
                ...prev,
                image: base64,
            }));
        }
    };

    const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const base64Promises = files.map(file => toBase64(file));
            const base64Images = await Promise.all(base64Promises);
            setTour(prev => ({
                ...prev,
                images: base64Images,
                image: prev.image || base64Images[0] || '' // Set primary image if it wasn't set
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(tour);
    };

    if (!isOpen) return null;

    const inputStyles = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
    const fileInputStyles = `${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ocean-blue-light file:text-ocean-blue-dark hover:file:bg-ocean-blue-light/80 cursor-pointer`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start py-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">{initialData?._id ? 'Edit Tour' : 'Create New Tour'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">Tour Name</label>
                                <input type="text" name="name" id="name" value={tour.name} onChange={handleChange} className={inputStyles} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium">Price ($)</label>
                                    <input type="number" name="price" id="price" value={tour.price} onChange={e => setTour(p => ({...p, price: Number(e.target.value)}))} className={inputStyles} required />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
                                    <input type="text" name="duration" id="duration" value={tour.duration} onChange={handleChange} className={inputStyles} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                                <textarea name="description" id="description" rows={3} value={tour.description} onChange={handleChange} className={inputStyles} required></textarea>
                            </div>
                            
                            {/* Image Upload Fields */}
                             <div>
                                <label htmlFor="primary-image" className="block text-sm font-medium">Primary Image</label>
                                <input type="file" id="primary-image" accept="image/*" onChange={handlePrimaryImageChange} className={fileInputStyles} />
                                {tour.image && <img src={tour.image} alt="Primary preview" className="mt-2 h-32 w-auto object-cover rounded-md shadow-sm" />}
                            </div>

                            <div>
                                <label htmlFor="gallery-images" className="block text-sm font-medium">Gallery Images</label>
                                <input type="file" id="gallery-images" accept="image/*" multiple onChange={handleGalleryImagesChange} className={fileInputStyles} />
                                {tour.images && tour.images.length > 0 && (
                                    <div className="mt-2 grid grid-cols-4 gap-2">
                                        {tour.images.map((img, index) => (
                                            <img key={index} src={img} alt={`Gallery preview ${index + 1}`} className="h-24 w-full object-cover rounded-md shadow-sm" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="groupSize" className="block text-sm font-medium">Group Size</label>
                                <input type="text" name="groupSize" id="groupSize" value={tour.additionalInfo.groupSize} onChange={handleNestedChange} className={inputStyles} />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="included" className="block text-sm font-medium">Included (one per line)</label>
                                    <textarea name="included" id="included" rows={3} value={tour.additionalInfo.included.join('\n')} onChange={e => handleArrayChange(e, 'included')} className={inputStyles}></textarea>
                                </div>
                                 <div>
                                    <label htmlFor="notIncluded" className="block text-sm font-medium">Not Included (one per line)</label>
                                    <textarea name="notIncluded" id="notIncluded" rows={3} value={tour.additionalInfo.notIncluded.join('\n')} onChange={e => handleArrayChange(e, 'notIncluded')} className={inputStyles}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-4 sticky bottom-0">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-ocean-blue text-white hover:bg-ocean-blue-dark">Save Tour</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TourForm;
