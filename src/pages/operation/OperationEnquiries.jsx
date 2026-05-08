import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiTrash2, FiPhone, FiUser, FiMessageSquare, FiClock } from 'react-icons/fi';

export default function OperationEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enquiries from Firestore
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEnquiries(data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setEnquiries(enquiries.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-600 mt-1">Customer enquiries from the contact form</p>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FiMessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No enquiries yet</p>
          <p className="text-sm text-gray-500 mt-1">Enquiries from the contact form will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div 
              key={enquiry.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Name & Phone */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <FiUser className="w-4 h-4 text-gray-500" />
                      {enquiry.name}
                    </div>
                    {enquiry.phone && (
                      <a 
                        href={`tel:+91${enquiry.phone}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <FiPhone className="w-4 h-4" />
                        {enquiry.phone}
                      </a>
                    )}
                  </div>

                  {/* Message */}
                  {enquiry.message && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiClock className="w-3 h-3" />
                    {formatDate(enquiry.createdAt)}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete enquiry"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {!loading && enquiries.length > 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          Total: {enquiries.length} {enquiries.length === 1 ? 'enquiry' : 'enquiries'}
        </div>
      )}
    </div>
  );
}
