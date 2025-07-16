import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import SimpleLayout from './components/layout/SimpleLayout.jsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import { SearchProvider } from './context/SearchContext';

function App() {
  
  return (
    <AuthProvider>
      <SearchProvider>
        <Router basename={process.env.PUBLIC_URL}>
  <Routes>
    <Route path="/" element={<Layout><HomePage /></Layout>} />
    <Route path="/search" element={<Layout><SearchPage /></Layout>} />
    <Route path="/results" element={<Layout><ResultsPage /></Layout>} />
    <Route path="/login" element={<SimpleLayout><LoginPage /></SimpleLayout>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;