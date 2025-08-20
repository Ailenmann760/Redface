import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/images/redface-logo.png" alt="RedFace Logo" className="h-24 w-auto mb-4" />
      <h1 className="text-4xl font-bold">Welcome to RedFace</h1>
      <p className="mt-4">Dating + Social Network</p>
      <div className="mt-8 space-x-4">
        {/* Replaced Button component with a standard button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          <Link to="/signup">Sign Up</Link>
        </button>
        <button className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold py-2 px-6 rounded-lg border border-gray-400 transition-colors">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
