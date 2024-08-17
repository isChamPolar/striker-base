import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpeedTool from '../pages/SpeedTool';
import ExpCalculator from '../pages/ExpCalculator';
import ExpAdjuster from '../pages/ExpAdjuster';
import ExCounter from '../pages/ExCounter';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/speed-tool" element={<SpeedTool />} />
      <Route path="/exp-calculator" element={<ExpCalculator />} />
      <Route path="/exp-adjuster" element={<ExpAdjuster />} />
      <Route path="/ex-counter" element={<ExCounter />} />
    </Routes>
  );
};

export default AppRoutes;
