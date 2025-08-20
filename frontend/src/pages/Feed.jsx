import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

// Replaced the import from a non-existent path
// import { Button, Card } from '../components/ui';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchFeed = async () => {
      const token = await currentUser.getIdToken();
      // Using the base URL defined in App.jsx
      const res = await axios.get('/api/posts/feed', { headers: { Authorization: `Bearer ${token}` } });
      setPosts(res.data);
    };
    fetchFeed();
  }, [currentUser]);

  const handleLike = async (postId) => {
    const token = await currentUser.getIdToken();
    const res = await axios.post(`/api/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setPosts(posts.map(p => p._id === postId ? res.data : p));
  };

  return (
    <div className="p-4">
      {posts.map(post => (
        // Replaced Card component with a standard div
        <div key={post._id} className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p>{post.text}</p>
          {post.image && <img src={post.image} alt="post" className="w-full" />}
          {/* Replaced Button component with a standard button */}
          <button onClick={() => handleLike(post._id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg mt-2">
            {post.likes.length} Likes
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
