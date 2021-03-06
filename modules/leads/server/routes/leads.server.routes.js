'use strict';

/**
 * Module dependencies
 */
var leadsPolicy = require('../policies/leads.server.policy'),
  leads = require('../controllers/leads.server.controller');

module.exports = function(app) {
  // Leads Routes
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.route('/api/leads')
    .get(leads.list)
    .post(leads.create);

  app.route('/api/leads/cnamelist/:cname')
    .get(leads.listByCreator);

  app.route('/api/leads/:leadId')
    .get(leads.read)
    .put(leads.update)
    .delete(leads.delete);

  // Finish by binding the Lead middleware
  app.param('leadId', leads.leadByID);
  app.param('cname',leads.listByCreator);
};
