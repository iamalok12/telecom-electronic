import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Brands from './pages/Brands'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import OperationLogin from './pages/OperationLogin'
import OperationLayout from './pages/OperationLayout'
import OperationProducts from './pages/operation/OperationProducts'
import OperationBrands from './pages/operation/OperationBrands'
import OperationServices from './pages/operation/OperationServices'
import OperationAnalytics from './pages/operation/OperationAnalytics'
import OperationPromotions from './pages/operation/OperationPromotions'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="brands" element={<Brands />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Operation Login */}
        <Route path="/operation/login" element={<OperationLogin />} />

        {/* Protected Operation Routes */}
        <Route 
          path="/operation" 
          element={
            <ProtectedRoute>
              <OperationLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/operation/products" replace />} />
          <Route path="products" element={<OperationProducts />} />
          <Route path="brands" element={<OperationBrands />} />
          <Route path="services" element={<OperationServices />} />
          <Route path="analytics" element={<OperationAnalytics />} />
          <Route path="promotions" element={<OperationPromotions />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

// Public Layout Component
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
