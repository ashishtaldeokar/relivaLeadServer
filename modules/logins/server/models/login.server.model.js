'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Login Schema
 */
var LoginSchema = new Schema({
  username: {
    type: String,
    default: '',
    required: 'Please fill Login name',
    trim: true
  },
  password : {
    type : String,
    default : '',
    required : 'password required'
  },
  created: {
    type: Date,
    default: Date.now
  }

});

mongoose.model('Login', LoginSchema);
