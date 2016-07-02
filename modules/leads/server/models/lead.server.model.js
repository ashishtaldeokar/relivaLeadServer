'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Lead Schema
 */
var LeadSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  mobile :{
    type : Number,
    default : null
  },
  callerName:{
    type : String,
    default: ''
  },
  patientName : {
    type : String,
    default : ''
  },
  email : {
    type : String,
    default : ''
  },
  leadSource : {
    type : String,
    default : ''
  },
  sourceDetail : {
    type : String,
    default : ''
  },
  attendedBy : {
    type : String,
    default : ''
  },
  condition : {

  },
  location : {
    type : String,
    default : ''
  },
  age : {
    type : Number,
    default : null
  },
  gender : {
    type : String,
    default : ''
  },
  comment : {
    type : String,
    default : ''
  },
  SEC : {
    type : String,
    default : ''
  },
  created: {
    type: Date,
    default: Date.now
  }

});

mongoose.model('Lead', LeadSchema);
