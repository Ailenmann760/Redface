const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const admin = require('firebase-admin');
const mongoose = require('mongoose');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

app.use('/api/users', require('./routes/user')(verifyToken));
app.use('/api/posts', require('./routes/post')(verifyToken));
app.use('/api/messages', require('./routes/message')(verifyToken));
app.use('/api/matches', require('./routes/match')(verifyToken));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('join', (userId) => socket.join(userId));
  socket.on('sendMessage', (msg) => {
    io.to(msg.receiverId).emit('receiveMessage', msg);
    // Basic notification
    io.to(msg.receiverId).emit('notification', { type: 'message', from: msg.senderId });
  });
  socket.on('typing', (data) => io.to(data.receiverId).emit('typing', data));
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
