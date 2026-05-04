import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RoadmapGeneratorPage from './pages/RoadmapGeneratorPage';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmap-generator" element={<RoadmapGeneratorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;