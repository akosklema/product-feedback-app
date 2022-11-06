import { useState, useEffect } from 'react';

function useViewportWidth() {
  const [viewportWidth, setViewportWitdh] = useState(window.innerWidth);
  
  useEffect(() => {
    window.addEventListener('resize', () => {
      setViewportWitdh(window.innerWidth);
    });
  
    return () => {
      window.removeEventListener('resize', () => {
        setViewportWitdh(window.innerWidth);
      });
    };
  }, []);

  return viewportWidth;
};

export default useViewportWidth;
