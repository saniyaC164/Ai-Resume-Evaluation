import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import UploadResume from "./pages/UploadResume";
import ResultsPage from "./pages/ResultsPage";
import JDMatch from "./pages/JDMatch";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/jd-match" element={<JDMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
