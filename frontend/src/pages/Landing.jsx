import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'; // Corrected relative import

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/images/redface-logo.png" alt="RedFace Logo" className="h-24 w-auto mb-4" />
      <h1 className="text-4xl font-bold">Welcome to RedFace</h1>
      <p className="mt-4">Dating + Social Network</p>
      <div className="mt-8 space-x-4">
        {/* Replace the non-existent Button component with the Navbar component */}
        <Navbar asChild>
          <Link to="/signup">Sign Up</Link>
        </Navbar>
        <Navbar variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Navbar>
      </div>
    </div>
  );
};

export default Landing;
