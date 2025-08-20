import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import Dating from './pages/Dating';
// REMOVED: import Feed from './pages/Feed';
// REMOVED: import Explore from './pages/Explore';
import Messaging from './pages/Messaging';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dating" element={<Dating />} />
          {/* REMOVED: <Route path="/feed" element={<Feed />} /> */}
          {/* REMOVED: <Route path="/explore" element={<Explore />} /> */}
          <Route path="/messages" element={<Messaging />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </motion.div>
    </div>
  );
}

export default App;
