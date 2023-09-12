const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');


// Route includes
const userRouter = require('./routes/user.router');
const weatherRouter = require('./routes/weather.router');
const gameRouter = require('./routes/game.router');
const announcementRouter = require('./routes/announcement.router');
const teamRouter = require('./routes/team.router');
const playerRouter = require('./routes/player.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/game', gameRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/team', teamRouter);
app.use('/api/player', playerRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
