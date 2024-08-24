import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '../pages/HomePage';
import SpeedTool from '../pages/SpeedTool';
import ExpCalculator from '../pages/ExpCalculator';
import { About } from '../pages/About';
import { Policy } from '../pages/Policy';
import ReleaseNotesPage from '../pages/ReleaseNotesPage';
// import ExpAdjuster from '../pages/ExpAdjuster';
// import ExCounter from '../pages/ExCounter';
import useGA4 from '../hooks/useGA4';

const AppRoutes = () => {
  useGA4();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = new URLSearchParams(location.search).get('path');
    
    const nonRedirectPaths = ['/sitemap.xml', '/robots.txt'];

    if (path && !nonRedirectPaths.some(nonRedirectPath => location.pathname.includes(nonRedirectPath))) {
      navigate(path, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/release-notes" element={<ReleaseNotesPage />} />
      <Route path="/speed-tool" element={<SpeedTool />} />
      <Route path="/exp-calculator" element={<ExpCalculator />} />
      {/* <Route path="/exp-adjuster" element={<ExpAdjuster />} />
      <Route path="/ex-counter" element={<ExCounter />} /> */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
