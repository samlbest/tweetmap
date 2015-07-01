var Twit = module.exports = {
  currentStream: {},
  updateFilterQuery: function(value) {
    var params = require('../../utilities/parameters.js');
    params.setFilterQuery(value);
    Twit.refreshStream();
  },
  refreshStream: function() {
    if (!!Twit.currentStream) {
      Twit.currentStream.destroy();
    }
    Twit.openStream();
  },
  openStream: function() {
    var params = require('../../utilities/parameters.js');

    var Twitter = require('twitter');
    sails.log(params.twitter);
    var client = new Twitter(params.twitter);

client.get('favorites/list', function(error, tweets, response){
  console.log(response.statusCode);
  if (!error) {
    console.log(tweets);
  }
});


      try {
        client.stream('statuses/filter', {track: params.filterQuery}, function(stream) {
          Twit.currentStream = stream;
          
          stream.on('data', function(tweet) {
            //console.log(tweet);
            tweet._streamingQuery = params.filterQuery;
            Tweet.create({
              text: tweet.text,
              place: tweet.place,
              filterQuery: params.filterQuery
            }).exec(function(err, model) {
              //sails.log('model: ', model);
            });
          });

          stream.on('error', function(error, data, response) {
            sails.log(error);
          });
        });

      }
      catch (ex) {
        sails.log(ex);
      }
  }
}
