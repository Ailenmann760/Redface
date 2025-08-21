import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button'; // Absolute import
import { Input } from '@/components/ui/input'; // Absolute import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  if (currentUser) navigate('/feed');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Check if profile is set, navigate accordingly (simplified)
      navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
