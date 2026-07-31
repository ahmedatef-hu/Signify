import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alphabet from './pages/Alphabet';
import Phrases from './pages/Phrases';
import Practice from './pages/Practice';
import SignGuide from './pages/SignGuide';
import DatabaseViewer from './pages/DatabaseViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/sign-guide" element={<SignGuide />} />
        <Route path="/database-viewer" element={<DatabaseViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
