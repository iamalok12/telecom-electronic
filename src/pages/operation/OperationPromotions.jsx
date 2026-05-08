import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import ImageUploader from '../../components/ImageUploader';
import { FiAlertCircle } from 'react-icons/fi';

export default function OperationPromotions() {
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch current promotion
  useEffect(() => {
    fetchPromotion();
  }, []);

  const fetchPromotion = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'settings', 'promotion');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPromotion(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching promotion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (url, path) => {
    try {
      setSaving(true);

      // Delete old image if exists
      if (promotion?.imagePath) {
        try {
          const oldImageRef = ref(storage, promotion.imagePath);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.log('Error deleting old image:', error);
        }
      }

      // Save new promotion
      const promotionData = {
        image: url,
        imagePath: path,
        updatedAt: serverTimestamp(),
        active: true
      };

      await setDoc(doc(db, 'settings', 'promotion'), promotionData);
      setPromotion(promotionData);
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Failed to save promotion');
    } finally {
      setSaving(false);
    }
  };

  const handleImageDelete = async () => {
    if (!confirm('Are you sure you want to delete the promotion banner?')) return;

    try {
      setSaving(true);

      // Delete image from storage
      if (promotion?.imagePath) {
        try {
          const imageRef = ref(storage, promotion.imagePath);
          await deleteObject(imageRef);
        } catch (error) {
          console.log('Error deleting image:', error);
        }
      }

      // Remove from Firestore
      await setDoc(doc(db, 'settings', 'promotion'), {
        image: null,
        imagePath: null,
        active: false,
        updatedAt: serverTimestamp()
      });

      setPromotion(null);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Failed to delete promotion');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Promotions Management</h2>
        <p className="text-gray-600 mt-1">
          Manage the promotional popup displayed on your homepage
        </p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
        <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Only ONE promotional popup can be active at a time</li>
            <li>Uploading a new image will automatically replace the old one</li>
            <li>The popup appears as a dismissable overlay on the homepage</li>
            <li>Users can close it with the X button</li>
            <li>Once dismissed, it won't show again unless you upload a new promotion</li>
            <li>Recommended size: 800x600px or similar portrait/square ratio</li>
          </ul>
        </div>
      </div>

      {/* Promotion Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading promotion...</p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {promotion?.image ? 'Current Promotion Popup' : 'Upload Promotion Popup'}
            </h3>
            
            <ImageUploader
              folder="promotions"
              currentImage={promotion?.image}
              onUploadComplete={handleImageUpload}
              onDelete={handleImageDelete}
              aspectRatio={4 / 5}
              outputSize={800}
            />

            {/* Status */}
            {promotion?.image && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-medium">Status:</span> Active - will show as popup on homepage
                </p>
                {promotion.updatedAt && (
                  <p className="text-sm text-green-700 mt-1">
                    Last updated: {new Date(promotion.updatedAt.seconds * 1000).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {!promotion?.image && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span> No promotion popup active
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Section */}
      {promotion?.image && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Homepage Popup Preview</h3>
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-900 bg-opacity-50 p-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-2xl">
              <img 
                src={promotion.image} 
                alt="Promotion popup preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            This is how your promotion popup will appear on the homepage
          </p>
        </div>
      )}
    </div>
  );
}
