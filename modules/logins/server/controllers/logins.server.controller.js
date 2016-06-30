'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Login = mongoose.model('Login'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Login
 */
exports.create = function(req, res) {
  var login = new Login(req.body);
  login.user = req.user;

  login.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(login);
    }
  });
};



exports.check = function (req, res){
    var obj = req.body;
    var response = {};
    Login.find(obj).exec(function(err, logins) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        if(logins.length === 0){
            response = {
                status : false,
                message : 'login failed'
            };
        }
        else{
          response = {
              status : true,
              message : 'login success'
          };
        }
        res.jsonp(response);
      }
    });


};

/**
 * Show the current Login
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var login = req.login ? req.login.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  login.isCurrentUserOwner = req.user && login.user && login.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(login);
};

/**
 * Update a Login
 */
exports.update = function(req, res) {
  var login = req.login ;

  login = _.extend(login , req.body);

  login.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(login);
    }
  });
};

/**
 * Delete an Login
 */
exports.delete = function(req, res) {
  var login = req.login ;

  login.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(login);
    }
  });
};

/**
 * List of Logins
 */
exports.list = function(req, res) {
  Login.find().sort('-created').populate('user', 'displayName').exec(function(err, logins) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(logins);
    }
  });
};

/**
 * Login middleware
 */
exports.loginByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Login is invalid'
    });
  }

  Login.findById(id).populate('user', 'displayName').exec(function (err, login) {
    if (err) {
      return next(err);
    } else if (!login) {
      return res.status(404).send({
        message: 'No Login with that identifier has been found'
      });
    }
    req.login = login;
    next();
  });
};
