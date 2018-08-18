module.exports = function(){

	var express = require('express');
	var router = express.Router();
  var session = require('express-session');

	//function authenticates the user
	function getListings(res, mysql, context, id, complete){
	var sql = "SELECT * FROM users U INNER JOIN user_saved_props USP ON U.user_id = USP.uid INNER JOIN properties P ON USP.pid = P.id WHERE U.email=?"
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(err, results, fields){
			if(err){
				res.write(JSON.stringify(err));
				res.end();
			}
			context.listings = results;
			complete();
		});
	}

	// Listings Routes
	/*router.get('/', function(req, res){
			res.render('saved_listings');
	});*/


	router.get('/', function(req, res){
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      context.user = req.session.user; 
      getListings(res, mysql, context, req.session.user, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
          		res.render('saved_listings', context);
          }
      }
  });

  router.post('/', function(req, res){
      //console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO user_saved_props (uid, pid) VALUES ((SELECT user_id FROM users WHERE email=?), ?)";
      var inserts = [req.session.user, req.body.id];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/saved_listings');
          }
      });
  });



	return router;
}();