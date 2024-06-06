require('dotenv').config({ path: './config/.env' }); // Ensure this is at the very top

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const chatRoutes = require('./routes/chatPage');
const OpenAI = require('openai');
const openai = new OpenAI();

// Passport config
require('./config/passport')(passport);

// Connect to database
connectDB();

// favicon supression
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Middleware setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      collectionName: 'sessions',
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Routes
app.use('/', mainRoutes);
app.use('/chatPage', chatRoutes);

// Server listener
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});

module.exports = openai;
