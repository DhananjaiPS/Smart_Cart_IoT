"use client";

import React, { useState, useEffect } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1553063085-dbbf64d936ea?ixlib=rb-4.1.0&auto=format&fit=crop&w=3131&q=80',
    title: 'Walk in. Shop smart. Walk out.',
    subtitle: 'Experience the future of retail with IoT-powered shopping',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.1.0&auto=format&fit=crop&w=3000&q=80',
    title: 'Scan. Pay. Done.',
    subtitle: 'Skip the lines with smart IoT-enabled checkout',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1633174524778-61a18ee54490?q=80&w=2392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Deals Tailored for You',
    subtitle: 'Get personalized recommendations while you shop',
  },
  {
    id: 4,
    image: '/team1.jpeg',
    title: 'Designed and Developed by Us',
    subtitle: 'Building Retails into Smart Reatail',
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // UPDATED: Using Tailwind h-[35vh] for mobile and lg:h-[65vh] for desktop.
    <div className="mb-8 sm:mb-12 relative rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 h-[35vh] lg:h-[65vh]">
      <div className="h-full w-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={idx !== currentSlide}
          >
            {/* Image fills the container, maintains aspect ratio, and crops if necessary */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              // Fallback for image loading errors (using a solid blue background)
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // prevents infinite loop
                target.style.display = 'none'; // hide broken image
                const parent = target.closest('div');
                if (parent) {
                  parent.style.backgroundColor = '#3b82f6'; // blue-500
                }
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Text Content - Responsive sizes */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-6 text-white drop-shadow-lg transition-opacity duration-1000">
                {slide.title}
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-4xl transition-opacity duration-1000">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;