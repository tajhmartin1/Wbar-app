import React, { useEffect, useState } from 'react';
import './SparkleCursor.css';

const SparkleCursor = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const addSparkle = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      const sparkle = {
        id: Date.now(),
        left: x + scrollX,
        top: y + scrollY,
      };
      setSparkles((prev) => [...prev, sparkle]);

      // Remove sparkles after they fade out
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, 1000); // 1-second lifetime
    };

    window.addEventListener('mousemove', addSparkle);
    window.addEventListener('touchmove', addSparkle); // For mobile devices

    return () => {
      window.removeEventListener('mousemove', addSparkle);
      window.removeEventListener('touchmove', addSparkle);
    };
  }, []);

  return (
    <div id="sparkle-effect">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{ left: sparkle.left, top: sparkle.top }}
        />
      ))}
    </div>
  );
};

export default SparkleCursor;
