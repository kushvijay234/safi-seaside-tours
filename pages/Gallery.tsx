import React, { useState, useEffect, useRef } from 'react';
import { galleryImages } from '../data/gallery';
import { GalleryImage } from '../types';

const SkeletonImage: React.FC = () => (
  <div className="relative aspect-[4/3] w-full bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg animate-pulse"></div>
);

const ImageModal: React.FC<{ image: GalleryImage | null; onClose: () => void }> = ({ image, onClose }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (image && dialog && !dialog.open) {
            dialog.showModal();
        } else if (!image && dialog && dialog.open) {
            dialog.close();
        }
    }, [image]);
    
    const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    if (!image) return null;

    return (
        <dialog ref={dialogRef} onClose={onClose} onClick={handleDialogClick} className="p-0 bg-transparent backdrop:bg-black/70 max-w-4xl w-full max-h-[80vh] rounded-lg overflow-hidden">
            <div className="relative">
                <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
                <form method="dialog" className="absolute top-2 right-2">
                    <button className="bg-black/50 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close image viewer">
                        <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </dialog>
    );
};

const Gallery: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    // Simulate fetching images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-off-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">Our Photo Album</h2>
          <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
            Scenes from the Seaside
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            A collection of beautiful moments captured on our tours across Nova Scotia.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            galleryImages.map((image) => <SkeletonImage key={image.id} />)
          ) : (
            galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-ocean-blue dark:focus:ring-offset-gray-900"
                aria-label={`View larger image for ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                   <i className="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></i>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default Gallery;
