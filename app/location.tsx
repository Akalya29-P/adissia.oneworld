import React, { useState, useRef, useCallback, useEffect } from 'react';

interface LocationData {
  id: number;
  title: string;
  subtitle?: string;
  distance: string;
  position: number;
}

const LocationPage: React.FC = () => {
  const [currentLeft, setCurrentLeft] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const navigationAreaRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const locations: LocationData[] = [
    { id: 1, title: 'Murari Hospital,', subtitle: 'Madhavaram', distance: '1.2 Km', position: 300 },
    { id: 2, title: 'Bosco Academy', subtitle: 'Matriculation School, Madhavaram', distance: '2.8 Km', position: 500 },
    { id: 3, title: "St Anthony's", subtitle: 'Hospital, Madhavaram', distance: '4.1 Km', position: 750 },
    { id: 4, title: 'Vasan Eye Care,', subtitle: 'Madhavaram', distance: '5.9 Km', position: 1000 },
    { id: 5, title: 'Greenfield Chennai', subtitle: 'International School, Madhavaram', distance: '7.2 Km', position: 1300 },
    { id: 6, title: 'Metro Station,', subtitle: 'Madhavaram', distance: '8.5 Km', position: 1600 },
    { id: 7, title: 'City Center Mall,', subtitle: 'Madhavaram', distance: '9.8 Km', position: 1900 },
  ];

  const calculateDistance = useCallback((left: number) => {
    const distance = Math.round(((left - 50) / 2150) * 10 * 10) / 10;
    return Math.max(0.1, distance);
  }, []);

  const calculateProgress = useCallback((left: number) => {
    return Math.max(0, ((left - 50) / 2150) * 100);
  }, []);

  const autoScroll = useCallback((left: number) => {
    if (!navigationAreaRef.current) return;

    const containerScrollLeft = navigationAreaRef.current.scrollLeft;
    const containerWidth = navigationAreaRef.current.clientWidth;

    if (left > containerScrollLeft + containerWidth - 300) {
      navigationAreaRef.current.scrollLeft = left - containerWidth + 300;
    } else if (left < containerScrollLeft + 200) {
      navigationAreaRef.current.scrollLeft = Math.max(0, left - 200);
    }
  }, []);

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsMoving(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX - currentLeft;

    e.preventDefault();
  }, [currentLeft]);

  const drag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newLeft = clientX - startXRef.current;
    const constrainedLeft = Math.max(50, Math.min(2200, newLeft));

    setCurrentLeft(constrainedLeft);
    autoScroll(constrainedLeft);

    e.preventDefault();
  }, [isDragging, autoScroll]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setIsMoving(false), 300);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => drag(e);
      const handleTouchMove = (e: TouchEvent) => drag(e);
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
  }, [isDragging, drag, stopDrag]);

  const distance = calculateDistance(currentLeft);
  const progress = calculateProgress(currentLeft);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div
          ref={navigationAreaRef}
          className="relative h-80 bg-white overflow-x-auto overflow-y-hidden border-b border-gray-200"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="relative h-full w-[2500px] bg-white">
            <div className="absolute top-8 left-8 bg-white border-2 border-orange-400 rounded-lg px-4 py-2 font-bold text-orange-400 shadow-lg z-50">
              <span className="text-3xl">{distance}</span>
              <span className="text-base ml-1">Km</span>
            </div>

            <div className="absolute top-8 right-8 text-gray-500 text-sm font-medium z-50">
              DRAG ME
            </div>

            <div className="absolute bottom-36 left-0 w-full h-0.5 bg-gray-300"></div>

            <div className="absolute bottom-32 left-0 w-full h-5">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute w-3 h-3 bg-orange-400 rounded-full border-2 border-white shadow-sm top-1"
                  style={{ left: `${location.position}px` }}
                ></div>
              ))}
            </div>

            <div
              ref={carContainerRef}
              className={`absolute bottom-32 cursor-grab active:cursor-grabbing z-40 transition-transform duration-200 ${
                isDragging ? 'scale-105' : ''
              } ${isMoving ? 'animate-bounce' : ''}`}
              style={{ left: `${currentLeft}px` }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              <div className="w-24 h-12 relative" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
                <div className="w-full h-full relative rounded-t-3xl rounded-b-lg" 
                  style={{
                    background: 'linear-gradient(145deg, #2c3e50 0%, #34495e 25%, #415971 50%, #34495e 75%, #2c3e50 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)'
                  }}>
                  
                  <div className="absolute top-1 left-3 right-3 h-7 rounded-2xl"
                    style={{ background: 'linear-gradient(145deg, #1a252f 0%, #2c3e50 50%, #1a252f 100%)' }}></div>
                  
                  <div className="absolute top-2 left-4 right-4 h-5 rounded-xl border border-white/40"
                    style={{
                      background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(135, 206, 235, 0.7) 30%, rgba(176, 224, 230, 0.8) 70%, rgba(173, 216, 230, 0.9) 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.1)'
                    }}></div>

                  <div className="absolute top-8 left-2 right-2 h-3 rounded"
                    style={{ background: 'linear-gradient(145deg, #34495e 0%, #2c3e50 50%, #34495e 100%)' }}></div>

                  <div className="absolute top-7 right-1 w-3 h-2 rounded-full bg-white shadow-sm"
                    style={{ boxShadow: '0 0 6px rgba(255,255,255,0.8)' }}></div>
                  <div className="absolute top-7 right-5 w-3 h-2 rounded-full bg-white shadow-sm"
                    style={{ boxShadow: '0 0 6px rgba(255,255,255,0.8)' }}></div>

                  <div className="absolute top-4 -left-1 w-2 h-1 rounded-sm bg-gray-700"></div>
                  <div className="absolute top-4 -right-1 w-2 h-1 rounded-sm bg-gray-700"></div>

                  <div className="absolute -bottom-2 right-3 w-4 h-4 rounded-full border-2 border-gray-600"
                    style={{ background: 'radial-gradient(circle, #333 0%, #1a1a1a 30%, #000 70%, #1a1a1a 100%)' }}>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{ background: 'radial-gradient(circle, #666, #333)' }}></div>
                  </div>
                  <div className="absolute -bottom-2 left-3 w-4 h-4 rounded-full border-2 border-gray-600"
                    style={{ background: 'radial-gradient(circle, #333 0%, #1a1a1a 30%, #000 70%, #1a1a1a 100%)' }}>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{ background: 'radial-gradient(circle, #666, #333)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute bottom-44 bg-white border border-gray-200 rounded-lg p-3 min-w-40 shadow-lg transform -translate-x-1/2"
                style={{ left: `${location.position}px` }}
              >
                <div className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                  {location.title}
                </div>
                {location.subtitle && (
                  <div className="text-xs text-gray-500 mb-2 leading-tight">
                    {location.subtitle.split(', ').map((part, index) => (
                      <div key={index}>{part}{index === 0 && location.subtitle!.includes(', ') ? ',' : ''}</div>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 font-medium">
                  {location.distance}
                </div>
              </div>
            ))}

            <div className="absolute bottom-10 left-12 flex items-center z-30">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}>
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="text-gray-800 text-2xl font-light tracking-wide">polaris</div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <div 
                className="h-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #f39c12, #e67e22)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
