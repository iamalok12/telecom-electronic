import { useState, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import Cropper from 'react-easy-crop';
import { FiUpload, FiX, FiImage, FiCheck } from 'react-icons/fi';

/**
 * Reusable ImageUploader component with cropping
 * @param {string} folder - Storage folder (e.g., 'products', 'promotions')
 * @param {string} currentImage - Current image URL (for preview/replacement)
 * @param {function} onUploadComplete - Callback with download URL
 * @param {function} onDelete - Callback when image is deleted
 * @param {number} aspectRatio - Aspect ratio for cropping (default: 1 for square)
 * @param {number} outputSize - Output size in pixels (default: 500)
 * @param {boolean} showPreview - Show product grid preview (default: false)
 */
export default function ImageUploader({ 
  folder, 
  currentImage, 
  onUploadComplete, 
  onDelete,
  aspectRatio = 1, // 1 = square, 16/9 = landscape, etc.
  outputSize = 500,
  showPreview = false
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');
  
  // Cropping state
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    
    // Read file and show cropper
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    });
    reader.readAsDataURL(file);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to desired output size
    canvas.width = outputSize;
    canvas.height = outputSize;

    // Draw the cropped image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputSize,
      outputSize
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleCropConfirm = async () => {
    try {
      setUploading(true);
      setError('');

      // Get cropped image blob
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const filename = `${timestamp}.jpg`;
      const storageRef = ref(storage, `${folder}/${filename}`);

      // Upload to Firebase Storage
      await uploadBytes(storageRef, croppedBlob);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update preview and call callback
      setPreview(downloadURL);
      onUploadComplete(downloadURL, storageRef.fullPath);
      
      // Close cropper
      setShowCropper(false);
      setImageSrc(null);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleDelete = async () => {
    if (!preview) return;

    try {
      setError('');
      setUploading(true);

      // Call the onDelete callback
      if (onDelete) {
        await onDelete();
      }

      setPreview(null);
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Cropper Modal */}
      {showCropper && (
        <>
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(107, 114, 128, 0.5)', transform: 'translateZ(0)' }}>
            <div 
              className="absolute inset-0"
              onClick={handleCropCancel}
            />
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative z-10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
              <p className="text-sm text-gray-600 mt-1">
                Adjust the crop area to make your image look perfect
              </p>
            </div>

            {/* Cropper */}
            <div className="relative h-80 bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom Control */}
            <div className="px-6 py-4 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Preview */}
            <div className="px-6 py-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview ({outputSize}x{outputSize}px)</p>
              <div className="flex gap-4">
                <div className="w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <div className="text-xs text-gray-500 text-center pt-8">Preview</div>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <div>
                    <p>• Image will be resized to {outputSize}x{outputSize}px</p>
                    <p>• Optimized for web display</p>
                    <p>• Compressed for fast loading</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCropCancel}
                disabled={uploading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                disabled={uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Crop & Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Preview or Upload Area */}
      {preview ? (
        <div className="space-y-3">
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
              <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex items-center gap-2">
                <FiUpload className="w-5 h-5" />
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <button
                onClick={handleDelete}
                disabled={uploading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2"
              >
                <FiX className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
          {/* Product Grid Preview */}
          {showPreview && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">How it looks in product grid:</p>
              <div className="flex gap-4">
                <img src={preview} alt="Grid preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                <img src={preview} alt="Grid preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                <img src={preview} alt="Grid preview" className="w-40 h-40 object-cover rounded-lg border border-gray-200" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiImage className="w-12 h-12 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG or JPG (max 5MB, will be cropped to {outputSize}x{outputSize}px)
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
