const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var path = require('path')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) 
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/back_sys')
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'))
db.once('open', function() {
	console.log(123)
    console.log('Mongodb started !')
})

const port = 3000;

var user = require('./routes/user');
var index = require('./routes/index');


app.use(function(req,res,next){
	var origin = req.headers.origin;
	res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials','true')
    
    next()
})


app.use('/', index);
app.use('/user', user);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port,function(){
	console.log('project running at http://127.0.0.1:'+port)
})
