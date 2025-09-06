import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (imageIndex: number) => {
    setSelectedImage(imageIndex);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const changeImage = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <>
      <Card className="border border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 font-hindi">{title}</h3>
          
          {/* Main Image */}
          <div className="mb-4">
            <img
              src={images[selectedImage]}
              alt={`${title} - Image ${selectedImage + 1}`}
              className="w-full h-64 md:h-80 object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(selectedImage)}
              data-testid={`image-main-${selectedImage}`}
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex space-x-3 overflow-x-auto gallery-scroll pb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className={`w-20 h-16 object-cover rounded cursor-pointer border-2 transition-colors ${
                  selectedImage === index 
                    ? 'border-primary' 
                    : 'border-border hover:border-primary'
                }`}
                onClick={() => changeImage(index)}
                data-testid={`image-thumbnail-${index}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          data-testid="modal-image-fullscreen"
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 touch-target"
              onClick={closeModal}
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[selectedImage]}
              alt={`${title} - Full size`}
              className="max-w-full max-h-full object-contain rounded-lg"
              data-testid="image-modal-full"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-sm font-hindi">
                {title} - {t('loading')} {selectedImage + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .gallery-scroll::-webkit-scrollbar-track {
          background: var(--muted);
        }
        .gallery-scroll::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};

export default ImageGallery;
