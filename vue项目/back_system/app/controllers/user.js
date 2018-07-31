var User = require('../models/user');

Array.prototype.customSort = function(str){
	this.sort(function (x, y) {
	    if (x[str] < y[str]) {
	        return 1;
	    }
	    if (x[str] > y[str]) {
	        return -1;
	    }
	    return 0;
	});
	return this;
}

module.exports = {
	testLogin:function(req,res){
		var _user = req.body;
		
		User.findByName(_user.username,function(err,user){
			if(err){
				return console.log('findByName error: ' + err)
			}
			if(!user){
				return res.json({status:0})
			}
			user.comparePassword(_user.password,function(err,isMatch){
				if(err){
					return console.log('password test error: ' + err)
				}
				if(!isMatch){ 
					return res.json({status: 1})
				}
				console.log('密码正确呀')
				res.cookie('username',user.username)
				res.cookie('role',user.role)
				return res.json({status: 2})
				
			})
		})
	},
	testRegist:function(req,res){
		var _user = req.body;
		User.findByName(_user.username,function(err,user){
			if(err){
				return console.log('findByName error: ' + err)
			}
			if(user){
				return res.json({status:'error'})
			}
			var newUser = new User(_user)
			newUser.save(function(err,user){
				if(err){
					console.log('save user error: ' + err);
					return res.json({status: 0})
				}
				return res.json({status:'success'})
			})
		})
	},
	logout:function(req,res){
		res.clearCookie('username')
		res.json({status:'success'})
	},
	postList:function(req,res){
		var data = req.body;
		User.update({_id:data.id},{$set:{role:data.role}},function(err,user){
			if(err){
				return console.log('app/controllers/user.js line 100 error: ' + err)
			}
			return res.json({'status':'success'})
		})
	},
	getList:function(req,res){
		User.find({},function(err,users){
			if(err){
				return console.log('user list find error:'+err)
			}
			res.json({users:users})
		})
	},
	adminRequired:function(req,res,next){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('app/controllers/user.js line 70 error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			if(user.role <= 40){
				return res.redirect('/')
			}
			next()
		})
	},
	loginStatus:function(req,res,next){
		if(req.cookies.username){
			return res.redirect('/')
		}
		next()
	},
	delUserAll (req,res){
		
	},
	update(req,res){
		var user = req.body;
		var newUser = new User(user)
		console.log(newUser)
		User.update({_id:user._id},newUser,function(err){
			if(err){
				console.log('user update error: '+err)
				return res.json({error:0})
			}
			User.find({},function(err,users){
				if(err){
					return console.log('user update error: '+err)
				}
				res.json({success:1})
			})
		})
	}
}


