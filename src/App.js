import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Institution from './pages/Institution';
import Training from './pages/Training';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/institutions" element={<Institution />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
