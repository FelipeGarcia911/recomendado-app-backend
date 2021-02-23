/**
 * Development specific configuration
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://localhost/nodejs-scaffolding-dev",
  },

  // Seed database on startup
  seedDB: false,
}
