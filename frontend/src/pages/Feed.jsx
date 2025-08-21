import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button'; // Absolute import
import { Card } from '@/components/ui/card'; // Absolute import

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchFeed = async () => {
      const token = await currentUser.getIdToken();
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
        <Card key={post._id} className="mb-4">
          <p>{post.text}</p>
          {post.image && <img src={post.image} alt="post" className="w-full" />}
          <Button onClick={() => handleLike(post._id)}>{post.likes.length} Likes</Button>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
