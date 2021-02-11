/**
 * Express configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

const bodyParser = require('body-parser');
const compression = require('compression');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const config = require('./environment');

const MongoStore = connectMongo(session);

module.exports = (app) => {
  const env = app.get('env');

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(compression());
  app.use(cookieParser());
  app.use(cors());
  app.use(methodOverride());
  app.use(morgan('dev'));
  app.use(passport.initialize());

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'nodejs-scaffolding',
    }),
  }));

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
};
