import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const trailingRef = useRef({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable elements for subtle scale up
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('.product-card') ||
        target.closest('.category-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Smooth animation loop for trailing physics
    let animId;
    const animateTrailing = () => {
      trailingRef.current.x += (pos.x - trailingRef.current.x) * 0.18;
      trailingRef.current.y += (pos.y - trailingRef.current.y) * 0.18;
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });
      animId = requestAnimationFrame(animateTrailing);
    };
    animId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, pos.x, pos.y]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Outer trailing luminous ring */}
      <div
        style={{
          position: 'fixed',
          left: trailingPos.x,
          top: trailingPos.y,
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          borderRadius: '50%',
          border: '1.5px solid rgba(108, 43, 217, 0.45)',
          background: isHovering ? 'rgba(255, 107, 154, 0.12)' : 'rgba(108, 43, 217, 0.05)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.22s ease, height 0.22s ease, background 0.22s ease',
          zIndex: 99998,
          backdropFilter: 'blur(1px)'
        }}
      />
      {/* Inner vibrant paint droplet */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: isHovering ? '10px' : '7px',
          height: isHovering ? '10px' : '7px',
          borderRadius: '50%',
          background: isHovering ? 'linear-gradient(135deg, #FF6B9A 0%, #FFD166 100%)' : '#6C2BD9',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease',
          zIndex: 99999,
          boxShadow: '0 0 10px rgba(108, 43, 217, 0.6)'
        }}
      />
    </>
  );
};

export default CustomCursor;
