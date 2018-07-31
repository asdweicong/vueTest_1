var mongoose = require('mongoose');
var BannerSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	url:String,
	size:Number,
	type:String,
	msg:String,
	id: Number
})

module.exports = BannerSchema;