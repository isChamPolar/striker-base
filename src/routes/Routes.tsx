import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpeedTool from '../pages/SpeedTool';
import ExpCalculator from '../pages/ExpCalculator';
import { About } from '../pages/About';
import { Policy } from '../pages/Policy';
// import ExpAdjuster from '../pages/ExpAdjuster';
// import ExCounter from '../pages/ExCounter';
import useGA4 from '../hooks/useGA4';

const AppRoutes = () => {
  useGA4();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/speed-tool" element={<SpeedTool />} />
      <Route path="/exp-calculator" element={<ExpCalculator />} />
      {/* <Route path="/exp-adjuster" element={<ExpAdjuster />} />
      <Route path="/ex-counter" element={<ExCounter />} /> */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
