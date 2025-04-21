import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProAnalysis from './pages/ProAnalysis';
import DirectAnalysis from './pages/DirectAnalysis';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pro-analysis" element={<ProAnalysis />} />
      <Route path="/direct-analysis" element={<DirectAnalysis />} />
    </Routes>
  );
}

export default App;
