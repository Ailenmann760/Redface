import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Input, Button } from '../components/ui';

const socket = io('http://localhost:5000'); // Replace with deployed URL

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [otherId, setOtherId] = useState(''); // Select from matches, simplified
  const currentUser = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('join', currentUser.uid);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receiveMessage');
  }, [currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = await currentUser.getIdToken();
      const res = await axios.get(`/api/messages/${otherId}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessages(res.data);
    };
    if (otherId) fetchMessages();
  }, [otherId, currentUser]);

  const sendMessage = async () => {
    const msg = { receiverId: otherId, text };
    const token = await currentUser.getIdToken();
    await axios.post('/api/messages', msg, { headers: { Authorization: `Bearer ${token}` } });
    socket.emit('sendMessage', { ...msg, senderId: currentUser.uid });
    setMessages([...messages, { ...msg, senderId: currentUser.uid }]);
    setText('');
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.senderId === currentUser.uid ? 'text-right' : 'text-left'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message" />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Messaging;
