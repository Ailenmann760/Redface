import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { Button } from '@/components/ui/button'; // Absolute import

const Settings = () => {
  const currentUser = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await auth.currentUser.delete();
      // Additional cleanup if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2>Settings</h2>
      <Button variant="destructive" onClick={handleDelete}>Delete Account</Button>
      {/* Add more settings like privacy, block list */}
    </div>
  );
};

export default Settings;
