/**
 * Test specific configuration
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/nodejs-scaffolding-test',
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false,
      },
    },
  },
};
