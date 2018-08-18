// CS61 Project

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var session = require('client-sessions');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.use('/', express.static('public'));
app.set('port', process.argv[2]);
app.use(express.static('views/images')); 

// Routes & functions files
app.use('/view-listings', require('./view-listings.js'));
app.use('/tenant', require('./tenant.js'));
app.use('/landlord', require('./landlord.js'));
app.use('/listings', require('./listings.js'));
app.use('/login', require('./login.js'));
app.use('/manage_prof', require('./manage_prof.js'));
app.use('/manage_prop', require('./manage_prop.js')); 
app.use('/register', require('./register.js'));
app.use('/saved_listings', require('./saved_listings.js'));
app.use(session({
  cookieName: 'session',
  secret: 'SuperSecretPassword',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// Home Route
app.get('/', function(req, res){
  res.render('home');
}); 

app.get('/about', function(req, res){
  res.render('about');
}); 

app.get('/careers', function(req, res){
  res.render('careers');
}); 


// ERROR ROUTES
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


// Server listen config
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});