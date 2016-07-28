var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function(app) {
  console.log('Configuring sessions.');
  app.use(session({
    store: new RedisStore(process.env.REDIS_SESSIONS_URL),
    secret: 'keyboard cat'
  }));
}
