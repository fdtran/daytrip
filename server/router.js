const Authentication = require('./controllers/authentication');
const tripsHandler = require('./controllers/trips-handler');
const userHandler = require('./controllers/user-handler');
const weatherHandler = require('./controllers/weather-handler');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);

// jaime/westin: removed middleware in the following route such that we can get friend data;
  app.get('/trips', tripsHandler.getTrips);

  app.post('/trips', requireAuth, tripsHandler.postTrips);
  app.put('/trips', requireAuth, tripsHandler.updateTrips);

// jaime/westin: removed middleware in the following route such that we get friend data;
  app.get('/user', userHandler.getUserInfo);

  app.put('/user', requireAuth, userHandler.updateUserInfo);
  app.patch('/user', requireAuth, userHandler.updateUserFriends);
  app.get('/weather', requireAuth, weatherHandler.sendData);
  app.patch('/weather', weatherHandler.fetchData);
};
