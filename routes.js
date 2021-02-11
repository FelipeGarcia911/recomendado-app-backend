/**
 * Main application routes
 */

const cors = require('cors');

// Import Endpoints
const user = require('./src/api/user');
const auth = require('./src/api/auth');

const API_ROUTE = 'api';

module.exports = (app) => {
  const whitelist = ['http://localhost:3030'];

  const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // Insert routes below
  app.use(`/${API_ROUTE}/user`, user);
  app.use(`/${API_ROUTE}/auth`, auth);
};
