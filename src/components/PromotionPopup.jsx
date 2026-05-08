import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FiX } from 'react-icons/fi';


export default function PromotionPopup() {
  const [promotion, setPromotion] = useState(null);
  const [shouldShow, setShouldShow] = useState(false); // always false on first render
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Always check after mount
    const checkAndFetch = async () => {
      const lastShown = localStorage.getItem('promotionPopupLastShown');
      let show = true;
      if (lastShown) {
        const lastShownTime = Number(lastShown);
        const now = Date.now();
        if (now - lastShownTime <= 3600000) {
          show = false;
        }
      }
      setShouldShow(show);
      if (!show) {
        setLoading(false);
        return;
      }
      try {
        // Fetch promotion from Firestore
        const docRef = doc(db, 'settings', 'promotion');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().active && docSnap.data().image) {
          setPromotion(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching promotion:', error);
        setLoading(false);
      }
    };
    // Delay showing popup slightly for better UX
    const timer = setTimeout(() => {
      checkAndFetch();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setPromotion(null);
    // Set current timestamp in localStorage
    localStorage.setItem('promotionPopupLastShown', Date.now().toString());
  };

  // Don't render anything until data is loaded

  if (loading || !promotion || !shouldShow) {
    return null;
  }

  return (
    <>
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(107, 114, 128, 0.5)', transform: 'translateZ(0)' }}>
        <div 
          className="absolute inset-0"
          onClick={handleDismiss}
        />
        <div className="relative max-w-lg w-full z-10">
          {/* Close Button - only show after image loads */}
          {imageLoaded && (
            <button
              onClick={handleDismiss}
              className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              aria-label="Close promotion"
            >
              <FiX className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Promotion Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={promotion.image}
              alt="Promotion"
              className="w-full h-auto"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
