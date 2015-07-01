var Parameters = module.exports = {
  filterQuery: 'shih tzu',
  twitter: sails.config.twitter,
  setFilterQuery: function(value) {
    Parameters.filterQuery = value;
  }
}
