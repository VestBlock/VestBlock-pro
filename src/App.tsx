import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProAnalysis } from './pages/ProAnalysis';
import { DirectAnalysis } from './pages/DirectAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pro-analysis" element={<ProAnalysis />} />
        <Route path="/direct-analysis" element={<DirectAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;