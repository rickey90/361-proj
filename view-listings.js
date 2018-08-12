module.exports = function(){

	var express = require('express');
	var router = express.Router();

	// Listings Functions
	function getListings(res, mysql, context, complete){
	mysql.pool.query('SELECT id, title, price, photos FROM properties', function(err, results, fields){
			if(err){
				res.write(JSON.stringify(err));
				res.end();
			}
			context.listings = results;
			complete();
		});
	}

	function getListingsByAC(res, mysql, context, id, complete){
	var sql = 'SELECT id, title, price, photos FROM properties WHERE zip_code = ?'
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

	router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getListingsByAC(res, mysql, context, req.params.id, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
              res.render('view-listings', context);
          }
      }
    });

	router.post('/', function(req, res){
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getListingsByAC(res, mysql, context, req.body.zipcode, complete);

      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
              res.render('view-listings', context);
          }
      }
  });

   /*router.post('/', function(req, res){
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
    });*/ 

	return router;
}();