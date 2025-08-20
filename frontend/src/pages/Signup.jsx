import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  if (currentUser) navigate('/feed');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile-setup');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/profile-setup');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Replaced Input component with standard input tag */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded-md" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4 p-2 border border-gray-300 rounded-md" />
      {/* Replaced Button components with standard button tags */}
      <button onClick={handleSignup} className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Sign Up</button>
      <button onClick={handleGoogle} className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold py-2 px-4 rounded-lg border border-gray-400">Sign Up with Google</button>
    </div>
  );
};

export default Signup;
