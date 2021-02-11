/**
 * Main application routes
 */

const cors = require('cors');

// Import Endpoints
const user = require('./src/api/user');
const auth = require('./src/api/auth');

module.exports = (app) => {
  const whitelist = ['http://localhost:3030'];
  const API_ROUTE = 'api';

  const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // Insert routes below
  app.use(`/${API_ROUTE}/users`, user);
  app.use(`/${API_ROUTE}/auth`, auth);
};
