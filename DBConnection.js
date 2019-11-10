var mongoose = require("mongoose");

function createDBConnection() {
  return mongoose.connect("mongodb://user:user12345@ds123151.mlab.com:23151/meanstackecommerce");
}

module.exports = createDBConnection
