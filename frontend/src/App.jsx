import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import LoadingPage from './pages/LoadingPage';
import ResumeResults from './pages/ResumeResults';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/resume-results" element={<ResumeResults />} />
      </Routes>
    </Router>
  );
}

export default App;
