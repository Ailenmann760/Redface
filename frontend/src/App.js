// App.js
// This file is the main entry point for the RedFace React frontend.
// It sets up the basic layout, handles dark/light mode, and includes
// a simple state-based routing system for different pages.

import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button'; // shadcn/ui Button component
import { Moon, Sun, Heart, MessageCircle, Rss, Compass } from 'lucide-react'; // Example icons
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// This is a placeholder for a real component from shadcn/ui
const ModeToggle = ({ theme, onToggle }) => {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle}>
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
};

// Placeholder components for the different pages
const LandingPage = ({ onNavigateToLogin, onNavigateToRegister }) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <motion.h1 
      className="text-5xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      RedFace
    </motion.h1>
    <motion.p 
      className="text-lg text-gray-500 dark:text-gray-400 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Connect, Swipe, and Share.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Button size="lg" className="mr-4" onClick={onNavigateToRegister}>Sign Up</Button>
      <Button size="lg" variant="outline" onClick={onNavigateToLogin}>Log In</Button>
    </motion.div>
  </div>
);

const DatingPage = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-3xl font-semibold mb-8">Find a Match</h2>
    <motion.div
      className="w-80 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center p-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <p className="text-center">Swipe Card Here</p>
    </motion.div>
  </div>
);

const FeedPage = () => (
  <div className="p-4">
    <h2 className="text-3xl font-semibold mb-8">Your Feed</h2>
    {/* Placeholder for a single post */}
    <div className="bg-gray-200 dark:bg-gray-800 rounded-xl p-4 mb-4">
      <div className="flex items-center space-x-4 mb-2">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        <p className="font-semibold">User Name</p>
      </div>
      <p>This is a sample post. So much content!</p>
    </div>
  </div>
);

const App = () => {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to handle dark/light mode toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleRegister = async (userData) => {
    try {
      // API call to the backend
      // --- CHANGE MADE HERE ---
      const response = await fetch('https://redface.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data.message);
        // Navigate to login or directly to the app
        setCurrentPage('login');
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      // API call to the backend
      // --- CHANGE MADE HERE ---
      const response = await fetch('https://redface.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data.message);
        setIsAuthenticated(true);
        setCurrentPage('feed'); // Navigate to the main app feed
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} />;
        case 'register':
          return <RegisterPage onRegister={handleRegister} onNavigateToLogin={() => setCurrentPage('login')} />;
        case 'landing':
        default:
          return <LandingPage onNavigateToLogin={() => setCurrentPage('login')} onNavigateToRegister={() => setCurrentPage('register')} />;
      }
    } else {
      // Pages for authenticated users
      switch (currentPage) {
        case 'dating':
          return <DatingPage />;
        case 'feed':
        default:
          return <FeedPage />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Header/Navigation */}
      <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold">RedFace</h1>
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" onClick={() => setCurrentPage('feed')}><Rss className="h-4 w-4 mr-2"/> Feed</Button>
              <Button variant="ghost" onClick={() => setCurrentPage('dating')}><Heart className="h-4 w-4 mr-2"/> Dating</Button>
              <Button variant="ghost"><Compass className="h-4 w-4 mr-2"/> Explore</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setCurrentPage('login')}>Log In</Button>
              <Button variant="ghost" onClick={() => setCurrentPage('register')}>Sign Up</Button>
            </>
          )}
          <ModeToggle theme={theme} onToggle={toggleTheme} />
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full flex items-center justify-center"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        &copy; 2024 RedFace. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
