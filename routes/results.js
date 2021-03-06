var express = require('express');
var router = express.Router();
var     request       = require('request');
User          = require('../models/user.js');  

router.get("/results", function (req, res){
    var search_key = req.query.search;
    res.locals.title = "Results-"+search_key;
    
    var url = "http://www.omdbapi.com/?s=" + search_key + "&apikey=b19362a8";
    request(url,
        function (error, response, body ) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                if(data.Response === "False") {
                    res.render('404');
                } else     {
                             res.render("results", {
                               data: data,
                               search_key:search_key
                             });
                           }

            }
        });

});
router.get("/results/:movie_title", function (req, res){
    var title = req.params.movie_title
    console.log(title);
    res.locals.title = "Results-"+title;

    var url = "http://www.omdbapi.com/?t=" + title + "&plot=full&apikey=b19362a8";
    request(url,
        function (error, response, body ) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                if(data.Response === "False") {
                    res.render('404');
                } else     {
                    //res.send(data);
                             res.render("movie_result", {
                               data: data
                             });
                           }

            }
        });

});
module.exports=router;