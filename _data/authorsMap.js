// Create a lookup map from the authors array
const authors = require('./authors.json');

module.exports = authors.reduce((map, author) => {
  map[author.slug] = author;
  return map;
}, {});
