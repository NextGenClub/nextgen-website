import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Routes from './routes';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;