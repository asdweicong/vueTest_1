var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user');


router.post('/login', User.testLogin);
router.post('/regist', User.testRegist);
router.post('/logout', User.logout);
router.post('/list', User.postList);
router.post('/getUsers', User.getList);

router.put('/update', User.update);

module.exports = router;
