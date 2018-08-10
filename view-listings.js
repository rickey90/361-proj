module.exports = function(){

	var express = require('express');
	var router = express.Router();

	// Listings Functions
	function getListings(res, mysql, context, complete){
	mysql.pool.query('SELECT', function(err, results, fields){
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
		var context = {};
		callbackCount = 0;
		var mysql = req.app.get('mysql');
		getListings(res, mysql, context, complete);

		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.render('view-listings', context);
			}
		}
	});

    router.post('/', function(req, res){
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO  () VALUES (?,?,?,?)";
        var inserts = [req.body., req.body., req.body., req.body.];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/view-listings');
            }
        });
    });

	return router;
}();