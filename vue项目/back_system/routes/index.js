var express = require('express');
var router = express.Router();
var Banner = require('../app/controllers/banner');
var Nav = require('../app/controllers/nav');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/banner/list',Banner.list)
router.post('/banner/upload',multipartMiddleware,Banner.uploadImg)
router.post('/banner/save',Banner.saveBanner)
router.delete('/banner/delete',Banner.del)
router.get('/banner/download',Banner.download) 

router.get('/nav/list',Nav.list)
router.post('/nav/save',Nav.saveNav)
router.delete('/nav/delete',Nav.del)


module.exports = router;