module.exports = function(){

	var express = require('express');
	var router = express.Router();

	//function registers the user in the database
  	router.post('/', function(req, res){
      var mysql = req.app.get('mysql');
      var checked;
      if(req.body.landlord === 1) { checked = 1; }
      else { checked = 0; }
      var sql = "INSERT INTO users (email, member_since, password, is_landlord) VALUES (?,CURDATE(),?, ?)";
      var inserts = [req.body.username, req.body.password, checked];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/login');
          }
      });
  });

	// Listings Routes
	router.get('/', function(req, res){
			res.render('register');
	});

	return router;
}();