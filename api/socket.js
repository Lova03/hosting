const { Server } = require('socket.io');
const Notification = require('./models/notification');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, process.env.FORUM_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('subscribe', (userId) => {
      if (userId) {
        socket.join(userId.toString());
        console.log(`User ${socket.id} subscribed to ${userId}`);
      } else {
        console.warn(`Invalid userId: ${userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });
  });

  // Handle server shutdown gracefully
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    io.close(() => {
      console.log('Socket.io server closed');
      process.exit(0);
    });
  });
};

const notifyUser = async (userId, type = 'info', link, content) => {
  try {
    const notification = new Notification({ user: userId, type, link, content });
    await notification.save();
    io.to(userId.toString()).emit('notification', notification);
    console.log(`Notification sent to user ${userId}`, notification);
  } catch (err) {
    console.error('Error notifying user:', err, { userId, type, link, content });
  }
};

module.exports = { initSocket, notifyUser };
