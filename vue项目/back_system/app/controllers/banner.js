var Banner = require('../models/banner');
var fs = require('fs')

module.exports = {
	list (req,res){
		Banner.find({},function(err,banners){
			if(err){
				console.log('banner find error: '+err)
				return res.json({status:404})
			}
			if(banners){
				return res.json({status: 1,banners: banners})
			}else{
				res.json({stutas: 0})
			}
		})
	},
	download (req,res){
			res.download(__dirname+'../../../public/images/banner/1527647933062banner133795.jpeg','banner.jpg',function(err,doc){
			if(err){
				return console.log(err)
			}
			console.log('下载！')
			console.log(doc)
		})
	},
	saveBanner (req,res){
		var _banner = req.body;
		Banner.findOne({'name':_banner.name},function(err,banner){
			if(err){
				console.log('banner findOne error: '+err)
				return res.json({status:0})
			}
			if(banner){
				return res.json({status:1})
			}
			var newBanner = new Banner(_banner);
			newBanner.save(function(err,doc){
				if(err){
					console.log('banner findOne error: '+err)
					return res.json({status:2})
				}
				console.log(doc)
				res.json({status:3,banner:doc})
			})
		})
	},
	del (req,res){
		var id = req.body.id;
		Banner.findOne({_id: id},function(err,banner){
			if(err){
				console.log('banner delete find error: '+err);
				return res.json({status:0})
			}
			if(!banner){
				return res.json({status:1})
			}
			banner.remove()
			console.log('删除成功！')
			res.json({status:2})
		})
	},
	delAll (req,res){
		
	},
	uploadImg (req,res){
		res.set( 'content-type', 'image/jpeg' )
		var files = req.files;
		var filePosters,id,l=0;
		for(var x in files){
			filePosters = files[x]
			id = x;
		}
		if(filePosters.constructor === Object){
			readWriteFile(filePosters,id,function(url){
				console.log(url)
				return res.json({success:2,url: url})
			})
		}else{
			for(var i=0;i<filePosters.length;i++){
				readWriteFile(filePosters[i],id,function(url){
					l++;
					if(l>=filePosters.length){
						res.json({success: 2,url:url})
					}
				})
			}
		}
		
	},
	deleteImg (req,res){
		var name = req.body.name;
		console.log(name)
		Img.findOne({'name':name},function(err,img){
			if(err){
				return console.log('img fineOne error: ' + err)
			}
			if(img){
				img.remove()
				res.json({success:1})
			}else{
				res.json({success:2})
			}
		})
	}
}

function readWriteFile(filePoster,id,callback){
	var type = filePoster.type.split(/\//)[1];
	var size = filePoster.size;
	var name = filePoster.name
	var path = filePoster.path;
	Banner.findOne({'name':name},function(err,doc){
		if(err){
			return console.log('img findOne error: '+err)
		}
		if(doc){
			return res.json({status:1});
		}
		var data = []
		var nowTime = Date.now();
		console.log(nowTime)
		var fileName = nowTime+id+size+'.'+type;
		var readStream = fs.createReadStream(path);
		readStream.on('data',function(chunk){
			data.push(chunk)
		})
		readStream.on('error',function(err){
			console.log(err,11111111)
		})
		readStream.on('end',function(){
			console.log('读取完毕！');
			var writeStream = fs.createWriteStream(__dirname+'../../../public/images/'+id+'/'+fileName)
			var fileData = Buffer.concat(data)
			writeStream.write(fileData);
			writeStream.end();
			writeStream.on('finish',function(){
				var url = '/images/'+id+'/'+fileName;
				
//				var img = new Img({
//					name:name,
//					id:id,
//					size:size,
//					type:type,
//					url:'/images/'+id+'/'+fileName
//				})
//				img.save(function(err){
//					if(err){
//						return console.log('img save error: ' + err)
//					}
//				})
				callback && callback(url)
			})
		})
		//show(id,size,type,path,callback)
	})
}
