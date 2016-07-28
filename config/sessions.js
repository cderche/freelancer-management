module.exports = function(app) {
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);
  app.use(session({
    store: new RedisStore(process.env.REDIS_SESSIONS_URL),
    secret: 'keyboard cat'
  }));
}
