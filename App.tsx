import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { EventDetails } from './pages/EventDetails';
import { Dashboard } from './pages/Dashboard';
import { CreateEvent } from './pages/CreateEvent';
import { AdminMaster } from './pages/AdminMaster';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          {/* Rota Segura/Oculta para Administração */}
          <Route path="/sys-master-secure-access" element={<AdminMaster />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;