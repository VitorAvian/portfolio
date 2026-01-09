import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // How strong the pull is (higher = stronger)
  active?: boolean;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5, active = true, className = "inline-block" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;
    
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Check if mouse is near the element (optional optimization)
      if (Math.abs(distanceX) < width && Math.abs(distanceY) < height) {
         setPosition({ x: distanceX * strength, y: distanceY * strength });
      } else {
         setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, active]);

  return (
    <div 
        ref={ref} 
        style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)' // Spring-like physics
        }}
        className={className}
    >
      {children}
    </div>
  );
};