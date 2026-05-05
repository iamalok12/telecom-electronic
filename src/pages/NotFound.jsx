import { Link } from 'react-router-dom'
import AnimateIn from '../components/AnimateIn'

export default function NotFound() {
  return (
    <AnimateIn variant="scale" className="container-x py-24 md:py-32 text-center">
      <p className="text-brand-600 font-semibold tracking-wider uppercase text-xs">404</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-500">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition"
      >
        Back to Home
      </Link>
    </AnimateIn>
  )
}
