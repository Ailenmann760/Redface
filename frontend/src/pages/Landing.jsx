import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button'; // shadcn

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to RedFace</h1>
      <p className="mt-4">Dating + Social Network</p>
      <div className="mt-8 space-x-4">
        <Button asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Landing;
