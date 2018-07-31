var mongoose = require('mongoose');
var navSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	url:String,
	type:1
})

module.exports = navSchema;