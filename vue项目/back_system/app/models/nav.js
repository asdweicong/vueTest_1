var mongoose = require('mongoose');
var navSchema = require('../schemas/banner');

var Nav = mongoose.model('Nav',navSchema);

module.exports = Nav;
