/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    filterQuery: {
      type: 'string',
      required: true,
      index: true
    },
    text: {
      type: 'string',
      required: true
    },
    placeJson: {
      type: 'json'
    }
  },
  afterCreate: function(tweet, next) {
    Tweet.publishCreate(tweet);
    next();
  }
};

