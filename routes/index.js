var express = require('express');
var router = express.Router();
var Blog_= require("../Models/Blogs");


/* GET home page. */
router.get("/index", function (req, res) {
    Blog_.find({}, function (err, Blog) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{ Blogs: Blog });
        }
    });
});

module.exports = router;
