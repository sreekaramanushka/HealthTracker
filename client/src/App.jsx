import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthLogs from './pages/HealthLogs';
import Nutrition from './pages/Nutrition';
import Sleep from './pages/Sleep';
import Water from './pages/Water';
import BmiCalculator from './pages/BmiCalculator';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/health" element={<ProtectedRoute><HealthLogs /></ProtectedRoute>} />
        <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
        <Route path="/sleep" element={<ProtectedRoute><Sleep /></ProtectedRoute>} />
        <Route path="/water" element={<ProtectedRoute><Water /></ProtectedRoute>} />
        <Route path="/bmi-calculator" element={<ProtectedRoute><BmiCalculator /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
