import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGA4 = () => {
  const location = useLocation();

  useEffect(() => {
    gtag('config', 'G-5HDV0C0KD0', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
};

export default useGA4;