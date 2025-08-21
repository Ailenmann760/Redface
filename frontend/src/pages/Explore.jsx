import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Card } from '@/components/ui/card'; // Absolute import
import { Button } from '@/components/ui/button'; // Absolute import

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchExplore = async () => {
      const token = await currentUser.getIdToken();
      const res = await axios.get('/api/posts/explore', { headers: { Authorization: `Bearer ${token}` } });
      setPosts(res.data);
    };
    fetchExplore();
  }, [currentUser]);

  const handleLike = async (postId) => {
    const token = await currentUser.getIdToken();
    const res = await axios.post(`/api/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setPosts(posts.map(p => p._id === postId ? res.data : p));
  };

  return (
    <div className="p-4">
      <h2>Explore Trending Posts</h2>
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

export default Explore;
