/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	
  subscribe: function (req, res) {
    if (req.isSocket) {
      Tweet.watch(req.socket);
      console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'Tweet\'.');
    }
  },
  setFilterQuery: function (req, res) {
    var params = require('../../utilities/parameters.js');
    var newQuery = req.body.filterQuery;
    if (!!newQuery) {
      sails.log(newQuery);
      params.setFilterQuery(newQuery);
      TwitterService.refreshStream();
      sails.log('new val: ' + params.filterQuery);
    }
  },
  getFilterQuery: function (req, res) {
    var params = require('../../utilities/parameters.js');
    res.send(params.filterQuery);
  }
};

