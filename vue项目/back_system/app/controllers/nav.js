var Nav = require('../models/nav');
module.exports = {
	list (req,res){
		Nav.find({},function(err,navs){
			if(err){
				console.log('nav find list error: '+err)
				return res.json({status:404})
			}
			if(navs){
				return res.json({status: 1,navs: navs})
			}else{
				res.json({stutas: 0})
			}
		})
	},
	saveNav (req,res){
		var _nav = req.body;
		Nav.findOne({'name':_nav.name},function(err,nav){
			if(err){
				console.log('nav save findOne error: '+ err)
				return res.json({status:0})
			}
			if(nav){
				res.json({status:1})
			}else{
				var newNav = new Nav(_nav);
				newNav.save(function(err,doc){
					if(err){
						console.log('nav save error: '+err)
						return res.json({status:2})
					}
					res.json({status:3,nav:doc})
				})
			}
		})
	},
	del (req,res){
		var id = req.body.id;
		console.log(id)
		Nav.findOne({_id:id},function (err,nav){
			if(err){
				console.log('nav delete findOne error: '+ err)
				return res.json({status:0})
			}
			if(!nav){
				return res.json({status:1})
			}
			nav.remove()
			console.log('删除成功！')
			res.json({status:2})
		})
	}
}
