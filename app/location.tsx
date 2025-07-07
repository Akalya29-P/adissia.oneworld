'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

const MAX_KM = 10;
const ROAD_WIDTH = 2400;
const KM_GAP = ROAD_WIDTH / MAX_KM;

interface LocationData {
  id: number;
  name: string;
  subtitle: string;
  distance: string;
  km: number;
}

export default function LocationTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [carPosition, setCarPosition] = useState(0); // Start at 0km (DRA Polaris position)
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, carPos: 0 });

  const locations: LocationData[] = [
    { id: 1, name: 'Murari Hospital', subtitle: 'Madhavaram', distance: '1.2 Km', km: 1.2 },
    { id: 2, name: 'Bosco Academy', subtitle: 'Matriculation School, Madhavaram', distance: '2.8 Km', km: 2.8 },
    { id: 3, name: "St Anthony's Hospital", subtitle: 'Madhavaram', distance: '4.1 Km', km: 4.1 },
    { id: 4, name: 'Vasan Eye Care', subtitle: 'Madhavaram', distance: '5.9 Km', km: 5.9 },
    { id: 5, name: 'Greenfield Chennai', subtitle: 'International School, Madhavaram', distance: '7.2 Km', km: 7.2 },
    { id: 6, name: 'Metro Station', subtitle: 'Madhavaram', distance: '8.5 Km', km: 8.5 },
    { id: 7, name: 'City Center Mall', subtitle: 'Madhavaram', distance: '9.8 Km', km: 9.8 },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const calculateDistance = (position: number) => {
    const km = (position / ROAD_WIDTH * MAX_KM);
    return Math.max(0, Math.min(MAX_KM, km)).toFixed(1);
  };

  const autoScroll = useCallback((carPos: number) => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const carScreenPos = carPos - scrollLeft;
    
    // Auto-scroll when car gets close to edges
    if (carScreenPos > containerWidth - 200) {
      container.scrollLeft = carPos - containerWidth + 200;
    } else if (carScreenPos < 200) {
      container.scrollLeft = Math.max(0, carPos - 200);
    }
  }, []);

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart({ x: clientX, carPos: carPosition });
  }, [carPosition]);

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStart.x;
    const newCarPosition = Math.max(0, Math.min(ROAD_WIDTH + 200, dragStart.carPos + deltaX));
    
    setCarPosition(newCarPosition);
    autoScroll(newCarPosition);
  }, [isDragging, dragStart, autoScroll]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDrag(e);
      const handleTouchMove = (e: TouchEvent) => handleDrag(e);
      const handleMouseUp = () => stopDrag();
      const handleTouchEnd = () => stopDrag();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleDrag, stopDrag]);

  const currentDistance = calculateDistance(carPosition);

  return (
    <div className="relative bg-gray-50 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-orange-500">Location</span> Highlights
        </h1>
      </div>

      {/* Main Timeline Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative h-[400px] overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Inner road content */}
          <div
            className="relative h-full"
            style={{ width: `${ROAD_WIDTH + 600}px` }}
          >
            {/* Distance Display Above Car */}
            <div
              className="absolute z-50 transform -translate-x-1/2"
              style={{
                left: `${carPosition + 300}px`,
                top: '60px',
              }}
            >
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg text-lg">
                {currentDistance} Km
              </div>
              <div className="text-center mt-1 text-xs text-gray-500 font-medium">
                DRAG ME
              </div>
            </div>

            {/* Horizontal Road Line */}
            <div 
              className="absolute h-[4px] bg-orange-400 transform -translate-y-1/2"
              style={{
                top: '50%',
                left: '300px',
                width: `${ROAD_WIDTH}px`
              }}
            />

            {/* KM Markers */}
            {Array.from({ length: MAX_KM }, (_, i) => i + 1).map((km) => (
              <div
                key={km}
                className="absolute flex flex-col items-center transform -translate-x-1/2"
                style={{
                  left: `${300 + (km * KM_GAP)}px`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm" />
              </div>
            ))}

            {/* Location Cards */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute bg-white border border-gray-200 rounded-lg p-3 shadow-lg transform -translate-x-1/2"
                style={{
                  left: `${300 + (location.km * KM_GAP)}px`,
                  top: '280px',
                  minWidth: '180px',
                }}
              >
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  {location.name}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {location.subtitle}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {location.distance}
                </div>
              </div>
            ))}

            {/* Draggable Car */}
            <div
              ref={carRef}
              className={`absolute z-40 cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
                isDragging ? 'scale-110' : 'scale-100'
              }`}
              style={{
                left: `${carPosition + 300}px`,
                top: '50%',
              }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              <div className="w-20 h-12 relative" style={{ filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.4))' }}>
                <svg viewBox="0 0 120 60" className="w-full h-full">
                  <defs>
                    <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e8e8e8" />
                      <stop offset="30%" stopColor="#f5f5f5" />
                      <stop offset="70%" stopColor="#d5d5d5" />
                      <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>
                    <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4a90e2" />
                      <stop offset="50%" stopColor="#357abd" />
                      <stop offset="100%" stopColor="#2c5f8a" />
                    </linearGradient>
                    <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2c3e50" />
                      <stop offset="100%" stopColor="#1a252f" />
                    </linearGradient>
                    <radialGradient id="rimGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#bdc3c7" />
                      <stop offset="80%" stopColor="#95a5a6" />
                      <stop offset="100%" stopColor="#7f8c8d" />
                    </radialGradient>
                  </defs>
                  
                  {/* Car shadow */}
                  <ellipse cx="60" cy="52" rx="45" ry="3" fill="rgba(0,0,0,0.2)" />
                  
                  {/* Car body */}
                  <path
                    d="M15 42 Q10 38 15 35 L20 28 Q25 22 35 20 L85 20 Q95 22 100 28 L105 35 Q110 38 105 42 L100 45 L20 45 Z"
                    fill="url(#carBodyGradient)"
                    stroke="#a0a0a0"
                    strokeWidth="0.8"
                  />
                  
                  {/* Front windshield */}
                  <path
                    d="M75 23 Q85 23 90 28 L85 32 Q80 28 75 28 Z"
                    fill="url(#windowGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Rear windshield */}
                  <path
                    d="M45 23 Q35 23 30 28 L35 32 Q40 28 45 28 Z"
                    fill="url(#windowGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Side windows */}
                  <rect x="48" y="25" width="24" height="8" rx="2" fill="url(#windowGradient)" opacity="0.7" />
                  
                  {/* Car doors */}
                  <line x1="60" y1="30" x2="60" y2="40" stroke="#a0a0a0" strokeWidth="1" />
                  
                  {/* Front wheel */}
                  <circle cx="85" cy="45" r="8" fill="url(#wheelGradient)" />
                  <circle cx="85" cy="45" r="6" fill="url(#rimGradient)" />
                  <circle cx="85" cy="45" r="3" fill="#ecf0f1" />
                  
                  {/* Rear wheel */}
                  <circle cx="35" cy="45" r="8" fill="url(#wheelGradient)" />
                  <circle cx="35" cy="45" r="6" fill="url(#rimGradient)" />
                  <circle cx="35" cy="45" r="3" fill="#ecf0f1" />
                  
                  {/* Headlights */}
                  <ellipse cx="103" cy="35" rx="3" ry="4" fill="#fff" opacity="0.9" />
                  <ellipse cx="103" cy="35" rx="2" ry="3" fill="#f39c12" opacity="0.7" />
                  
                  {/* Taillights */}
                  <ellipse cx="17" cy="35" rx="2" ry="3" fill="#e74c3c" opacity="0.8" />
                  
                  {/* Grille */}
                  <rect x="98" y="32" width="5" height="6" fill="#34495e" rx="1" />
                  <rect x="99" y="33" width="3" height="1" fill="#7f8c8d" />
                  <rect x="99" y="35" width="3" height="1" fill="#7f8c8d" />
                  <rect x="99" y="37" width="3" height="1" fill="#7f8c8d" />
                  
                  {/* Door handles */}
                  <rect x="50" y="35" width="2" height="3" fill="#7f8c8d" rx="1" />
                  <rect x="68" y="35" width="2" height="3" fill="#7f8c8d" rx="1" />
                  
                  {/* Side mirrors */}
                  <ellipse cx="25" cy="30" rx="2" ry="1.5" fill="#95a5a6" />
                  <ellipse cx="95" cy="30" rx="2" ry="1.5" fill="#95a5a6" />
                  
                  {/* Antenna */}
                  <line x1="90" y1="23" x2="90" y2="18" stroke="#7f8c8d" strokeWidth="1" />
                  
                  {/* Car badge */}
                  <rect x="58" y="38" width="4" height="3" fill="#34495e" rx="1" />
                </svg>
              </div>
            </div>

            {/* Polaris logo at start */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center space-x-3 z-30">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}>
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <div className="text-gray-800">
                <div className="text-xl font-bold">DRA</div>
                <div className="text-lg font-light">Polaris</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}