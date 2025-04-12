import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExpenseProvider from './context/ExpenseContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import './App.css';

const App = () => {
  return (
    <ExpenseProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </div>
    </ExpenseProvider>
  );
};

export default App;