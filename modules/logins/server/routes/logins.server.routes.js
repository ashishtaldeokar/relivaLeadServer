'use strict';

/**
 * Module dependencies
 */
var loginsPolicy = require('../policies/logins.server.policy'),
  logins = require('../controllers/logins.server.controller');

module.exports = function(app) {
  // Logins Routes
  app.route('/api/logins')
    .get(logins.list)
    .post(logins.create);

  app.route('/api/logins/:loginId')
    .get(logins.read)
    .put(logins.update)
    .delete(logins.delete);

  app.route('/api/logins/check')
      .post(logins.check);

  // Finish by binding the Login middleware
  app.param('loginId', logins.loginByID);
  //app.param('password',logins.check);
};
