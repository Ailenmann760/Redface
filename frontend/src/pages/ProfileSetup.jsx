import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button'; // Absolute import
import { Input } from '@/components/ui/input'; // Absolute import
import { Textarea } from '@/components/ui/textarea'; // Absolute import

const ProfileSetup = () => {
  const [pic, setPic] = useState(null);
  const [bio, setBio] = useState('');
  const [about, setAbout] = useState('');
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  const handleSave = async () => {
    try {
      let url = '';
      if (pic) {
        const storageRef = ref(storage, `profiles/${currentUser.uid}`);
        await uploadBytes(storageRef, pic);
        url = await getDownloadURL(storageRef);
      }
      const token = await currentUser.getIdToken();
      await axios.post('/api/users/profile', { profilePic: url, bio, about }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <Input type="file" onChange={(e) => setPic(e.target.files[0])} className="mb-4" />
      <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="mb-4" />
      <Textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" className="mb-4" />
      <Button onClick={handleSave}>Save Profile</Button>
    </div>
  );
};

export default ProfileSetup;
