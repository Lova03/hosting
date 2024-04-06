require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');

const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 5000;

// Init passport & sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Logging to console
app.use(morgan('dev'));

// CORS
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
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
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
