import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout children={undefined} />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
