module.exports = function(){

	var express = require('express');
	var router = express.Router();

	//function authenticates the user
	function getProfile(res, mysql, context, id, complete){
	var sql = "SELECT user_id, email, DATE_FORMAT(member_since, '%M-%d-%Y') AS 'member_since' FROM users WHERE user_id=?"
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(err, results, fields){
			if(err){
				res.write(JSON.stringify(err));
				res.end();
			}
			context.user = results[0];
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
      getProfile(res, mysql, context, req.body.id, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
          		res.render('manage_prof', context);
          }
      }
  });

	return router;
}();