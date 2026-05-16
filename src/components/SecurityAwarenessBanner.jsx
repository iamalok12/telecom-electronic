import { useState, useEffect } from 'react'
import AnimateIn from './AnimateIn'

const securityFacts = [
  {
    id: 1,
    icon: '🎥',
    fact: 'Over 70% of burglaries in India happen in properties without CCTV surveillance',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 2,
    icon: '🚨',
    fact: '85% of theft cases in Indian cities occur due to lack of proper security systems',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 3,
    icon: '🔥',
    fact: 'India reports over 25,000 fire incidents annually. Early detection saves lives',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 4,
    icon: '⏱️',
    fact: 'Average burglary in India takes just 10-15 minutes. Is your property protected?',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 5,
    icon: '🛡️',
    fact: 'Properties with visible security systems are 4x less likely to be targeted by criminals',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 6,
    icon: '📊',
    fact: 'CCTV footage helps Indian police solve 65% of cases in monitored areas',
    color: 'from-orange-500 to-amber-600'
  }
]

export default function SecurityAwarenessBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % securityFacts.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const currentFact = securityFacts[currentIndex]

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  return (
    <AnimateIn variant="fade-up">
      <section className="relative overflow-hidden">
        {/* Gradient Background with Animation */}
        <div className={`bg-gradient-to-r ${currentFact.color} transition-all duration-1000`}>
          <div className="container-x py-8 md:py-10">
            <div className="max-w-4xl mx-auto">
              {/* Content Container */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                {/* Icon */}
                <div 
                  className={`flex-shrink-0 text-5xl md:text-6xl transform transition-all duration-500 ${
                    isTransitioning ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                  }`}
                  aria-hidden="true"
                >
                  {currentFact.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <div 
                    className={`transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    <p className="text-white text-lg md:text-xl lg:text-2xl font-bold leading-relaxed drop-shadow-md">
                      <span className="text-white/90">Did you know?</span> {currentFact.fact}
                    </p>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex-shrink-0 flex flex-row md:flex-col gap-2 md:gap-3">
                  {securityFacts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? 'bg-white w-3 h-3 md:w-3.5 md:h-3.5 shadow-lg'
                          : 'bg-white/40 hover:bg-white/60 w-2.5 h-2.5 md:w-3 md:h-3'
                      }`}
                      aria-label={`Go to security fact ${index + 1}`}
                      aria-current={index === currentIndex}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/60 rounded-full transition-all"
                  style={{
                    width: `${((currentIndex + 1) / securityFacts.length) * 100}%`,
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>
    </AnimateIn>
  )
}
