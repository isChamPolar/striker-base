import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
