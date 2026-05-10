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
import { db } from '../../config/firebase';
import { ServiceIcon } from '../../components/Icons';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';

// Available icon options
const ICON_OPTIONS = [
  { value: 'wrench', label: 'Wrench' },
  { value: 'shield', label: 'Shield' },
  { value: 'tools', label: 'Tools' },
  { value: 'upgrade', label: 'Upgrade' },
  { value: 'bulb', label: 'Light Bulb' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'camera', label: 'Camera' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'lock', label: 'Lock' },
  { value: 'eye', label: 'Eye' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'clock', label: 'Clock' },
  { value: 'headset', label: 'Headset' },
  { value: 'settings', label: 'Settings' },
  { value: 'star', label: 'Star' },
  { value: 'users', label: 'Users' },
  { value: 'server', label: 'Server' }
];

export default function OperationSolutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'wrench',
    highlights: ['', '', '']
  });

  // Fetch solutions on mount
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'solutions'));
        const solutionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSolutions(solutionsData);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const fetchSolutionsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'solutions'));
      const solutionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSolutions(solutionsData);
      
      // Clear cache to ensure public pages get fresh data
      sessionStorage.removeItem('solutions');
      sessionStorage.removeItem('homeSolutions');
    } catch (error) {
      console.error('Error fetching solutions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const removeHighlight = (index) => {
    if (formData.highlights.length > 1) {
      const newHighlights = formData.highlights.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, highlights: newHighlights }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const filteredHighlights = formData.highlights.filter(h => h.trim());
    if (filteredHighlights.length === 0) {
      alert('Please add at least one highlight');
      return;
    }

    setSaving(true);
    try {
      const solutionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        highlights: filteredHighlights,
        updatedAt: serverTimestamp()
      };

      if (editingSolution) {
        // Update existing solution
        await updateDoc(doc(db, 'solutions', editingSolution.id), solutionData);
      } else {
        // Add new solution
        solutionData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'solutions'), solutionData);
      }

      await fetchSolutionsData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('Failed to save solution. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (solution) => {
    setEditingSolution(solution);
    setFormData({
      title: solution.title,
      description: solution.description,
      icon: solution.icon,
      highlights: solution.highlights
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;

    try {
      await deleteDoc(doc(db, 'solutions', id));
      await fetchSolutionsData();
    } catch (error) {
      console.error('Error deleting solution:', error);
      alert('Failed to delete solution. Please try again.');
    }
  };

  const handleOpenModal = () => {
    setEditingSolution(null);
    setFormData({
      title: '',
      description: '',
      icon: 'wrench',
      highlights: ['', '', '']
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSolution(null);
    setFormData({
      title: '',
      description: '',
      icon: 'wrench',
      highlights: ['', '', '']
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center py-12">
        <div className="text-gray-500">Loading solutions...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Solutions Management</h1>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          <FiPlus className="w-5 h-5" />
          Add Solution
        </button>
      </div>

      {/* Solutions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-brand-300 hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 grid place-items-center">
              <ServiceIcon name={solution.icon} className="w-6 h-6" />
            </div>

            {/* Content */}
            <h3 className="mt-4 font-semibold text-lg text-gray-900">{solution.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{solution.description}</p>
            
            {/* Highlights */}
            {solution.highlights && solution.highlights.length > 0 && (
              <ul className="mt-4 space-y-1">
                {solution.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-brand-600 mt-1">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
              <button
                onClick={() => handleEdit(solution)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(solution.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {solutions.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No solutions yet. Click "Add Solution" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSolution ? 'Edit Solution' : 'Add Solution'}
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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="e.g., CCTV Installation"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Describe what this solution offers..."
                  required
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {ICON_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                      className={`p-3 border-2 rounded-lg transition flex flex-col items-center gap-2 ${
                        formData.icon === option.value
                          ? 'border-brand-600 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ServiceIcon name={option.value} className="w-6 h-6 text-brand-600" />
                      <span className="text-xs text-gray-600 text-center leading-tight">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Highlights <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-sm text-brand-600 hover:text-brand-700"
                  >
                    + Add highlight
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder={`Highlight ${index + 1}`}
                      />
                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
                  {saving ? 'Saving...' : (editingSolution ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
