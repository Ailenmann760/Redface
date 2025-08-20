import { Link } from 'react-router-dom';
import { Switch } from './ui/switch'; // From shadcn/ui
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex justify-between p-4 bg-background border-b">
      <Link to="/feed">
        <img src="/images/redface-logo.png" alt="RedFace Logo" className="h-8 w-auto" />
      </Link>
      <div className="flex space-x-4">
        <Link to="/feed">Feed</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/dating">Dating</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        <Moon className="h-4 w-4" />
      </div>
    </nav>
  );
};

export default Navbar;
