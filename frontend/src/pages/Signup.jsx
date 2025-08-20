import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { Button, Input } from '../components/ui/button'; // shadcn Input from shadcn

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
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4" />
      <Button onClick={handleSignup} className="mb-4">Sign Up</Button>
      <Button variant="outline" onClick={handleGoogle}>Sign Up with Google</Button>
    </div>
  );
};

export default Signup;
