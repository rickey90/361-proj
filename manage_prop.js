module.exports = function(){

	var express = require('express');
	var router = express.Router();

	//function authenticates the user
	function getListings(res, mysql, context, id, complete){
	var sql = "SELECT * FROM users U INNER JOIN landlords_props LP ON U.user_id = LP.uid INNER JOIN properties P ON LP.pid = P.id WHERE U.user_id=?"
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
	router.get('/', function(req, res){
			res.render('login');
	});


	router.post('/', function(req, res){
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getListings(res, mysql, context, req.body.id, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
          		res.render('manage_prop', context);
          }
      }
  });

	return router;
}();