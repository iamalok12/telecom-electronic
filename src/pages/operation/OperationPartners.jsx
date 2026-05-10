import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import ImageUploader from '../../components/ImageUploader';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';

export default function OperationPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    imagePath: ''
  });

  // Fetch partners on mount
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'partners'));
        const partnersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPartners(partnersData.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const fetchPartnersData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'partners'));
      const partnersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPartners(partnersData.sort((a, b) => a.name.localeCompare(b.name)));
      
      // Clear cache to ensure public pages get fresh data
      sessionStorage.removeItem('partners');
      sessionStorage.removeItem('homePartners');
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl, imagePath) => {
    setFormData(prev => ({ ...prev, image: imageUrl, imagePath }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Please enter partner name');
      return;
    }

    if (!formData.image) {
      alert('Please upload a partner logo');
      return;
    }

    setSaving(true);
    try {
      const partnerData = {
        name: formData.name.trim(),
        image: formData.image,
        imagePath: formData.imagePath,
        updatedAt: serverTimestamp()
      };

      if (editingPartner) {
        // Update existing partner
        await updateDoc(doc(db, 'partners', editingPartner.id), partnerData);
      } else {
        // Add new partner
        partnerData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'partners'), partnerData);
      }

      await fetchPartnersData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving partner:', error);
      alert('Failed to save partner. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      image: partner.image,
      imagePath: partner.imagePath || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id, imagePath) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;

    try {
      // Delete partner document
      await deleteDoc(doc(db, 'partners', id));
      
      // Delete image from storage if exists
      if (imagePath) {
        try {
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      await fetchPartnersData();
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Failed to delete partner. Please try again.');
    }
  };

  const handleOpenModal = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      image: '',
      imagePath: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPartner(null);
    setFormData({
      name: '',
      image: '',
      imagePath: ''
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center py-12">
        <div className="text-gray-500">Loading partners...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Partners Management</h1>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          <FiPlus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-brand-300 hover:shadow-md transition"
          >
            {/* Partner Logo */}
            <div className="aspect-[3/2] rounded-lg bg-gray-50 border border-gray-200 overflow-hidden mb-4">
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Partner Name */}
            <h3 className="font-semibold text-lg text-gray-900 text-center mb-4">{partner.name}</h3>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(partner)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(partner.id, partner.imagePath)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No partners yet. Click "Add Partner" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPartner ? 'Edit Partner' : 'Add Partner'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="e.g., Hikvision"
                  required
                />
              </div>

              {/* Partner Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Logo <span className="text-red-500">*</span>
                </label>
                <ImageUploader
                  folder="partners"
                  currentImage={formData.image}
                  onUploadComplete={handleImageUpload}
                  aspectRatio={1}
                  outputSize={500}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Upload partner logo (PNG, JPG, or SVG recommended for best quality)
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? 'Saving...' : (editingPartner ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
