module.exports = function(){

	var express = require('express');
	var router = express.Router();

	//function authenticates the user
	function authenticate_user(res, mysql, context, us, pw, complete){
	var sql = 'SELECT user_id, email, member_since FROM users WHERE email=? AND password=?'
	var inserts = [us, pw];
	mysql.pool.query(sql, inserts, function(err, results, fields){
			if(err){
				res.write(JSON.stringify(err));
				res.end();
			}
			context.user = results[0];
			if(typeof context.user === "undefined")
			{
				context.error = 1;
			}
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
      authenticate_user(res, mysql, context, req.body.username, req.body.password, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
          	if(context.error)
          	{
              res.render('login', context);
          	}
          	else
          	{
          		res.render('user_home', context);
          	}
          }
      }
  });

	return router;
}();