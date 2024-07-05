require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const apiRouter = require('./routes/api');
const { initSocket } = require('./socket.js');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

// const { createClient } = require('redis');
// const RedisStore = require('connect-redis').default;

const authRouter = require('./routes/auth');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .catch((err) => {
    console.log(err);
    console.log('Failed to connect to the database!');
  });

require('./passport.js');

// Init socket.io
initSocket(server);

const PORT = process.env.PORT || 5000;

// Redis client setup
// const redisClient = createClient({
//   password: process.env.REDIS_PASSWORD, // If you have a password set for Redis
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
//   tls: process.env.NODE_ENV === 'production' ? {} : null, // Enable TLS if in production
// });

// redisClient
//   .connect()
//   .then(() => {
//     console.log('Successfully connected to redis!');
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('Failed to connect to redis!');
//   });

// Init passport & sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
    // store: new RedisStore({ client: redisClient }),
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, autoRemove: 'native' }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Logging to console
app.use(morgan('dev'));

// CORS
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, `${process.env.FORUM_URL}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Request handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Router
app.use('/api', apiRouter);

// AUTH Router
app.use('/auth', authRouter);

// Main endpoint redirect
app.get('/', (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
