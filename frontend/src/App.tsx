import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
};

export default App;