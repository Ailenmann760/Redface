import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactTinderCard from 'react-tinder-card';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dating = () => {
  const [suggested, setSuggested] = useState([]);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchSuggested = async () => {
      const token = await currentUser.getIdToken();
      const res = await axios.get('/api/matches/suggested', { headers: { Authorization: `Bearer ${token}` } });
      setSuggested(res.data);
    };
    fetchSuggested();
  }, [currentUser]);

  const onSwipe = async (direction, targetId) => {
    const token = await currentUser.getIdToken();
    await axios.post('/api/matches/swipe', { targetId, direction }, { headers: { Authorization: `Bearer ${token}` } });
    setSuggested(suggested.filter(u => u.firebaseId !== targetId));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {suggested.map((user) => (
        <motion.div key={user._id} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
          <ReactTinderCard onSwipe={(dir) => onSwipe(dir, user.firebaseId)} preventSwipe={['up', 'down']}>
            <div className="w-80 h-96 bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${user.profilePic})` }}>
              <div className="p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-xl">{user.name}</h3>
                <p>{user.bio}</p>
              </div>
            </div>
          </ReactTinderCard>
        </motion.div>
      ))}
    </div>
  );
};

export default Dating;
