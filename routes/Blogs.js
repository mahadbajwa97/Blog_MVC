var express = require('express');
var router = express.Router();
const multer = require('multer');

var Blog_= require("../Models/Blogs"),
    Comment= require("../Models/Comments");
//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

        //specify destination
        destination: function(req, file, next){
            next(null, './views/image-storage/');
        },

        //specify the filename to be unique
        filename: function(req, file, next){
            console.log(file);
            //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
            const ext = file.mimetype.split('/')[1];
            //set the file fieldname to a unique name containing the original name, current datetime and the extension.
            next(null, file.fieldname + '-' + Date.now() + '.'+ext);
        }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
        if(!file){
            next();
        }
        // only permit image mimetypes
        const image = file.mimetype.startsWith('image/');
        if(image){
            console.log('photo uploaded');
            next(null, true);
        }else{
            console.log("file not supported");
            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};





router.get("/", function (req, res)
{
    res.render("Form");
});
router.post("/addBlog",  multer(multerConfig).single('photo'),  function (req, res) {
    console.log(req.body.textbox);

    Blog_.create({blog_title: req.body.BlogName,
        AuthorName: req.body.AuthorName,


    }, function (err, addedblog) {
        if(err)
        {
            console.log("Not Added");
        }
        else
        {
            // Constructor function for Person objects
            function B(text, image) {
                section_text = text;
                section_image = image;
            }
            console.log(req.file.filename);

            console.log(addedblog);
            for(var i=0; i<req.body.textbox.length ; i++)
            {
                console.log(req.body.textbox[i]);
                var obj={
                    section_text: req.body.textbox[i],
                    section_image: req.file.filename
                };
                console.log(obj.section_text);
                addedblog.Blog_sections.push(obj);

            }
            addedblog.save();
            console.log("Added");
            res.redirect("/blog/"+addedblog._id);
        }
    });
});

router.get("/blog/:id", function (req, res) {
    Blog_.find({_id: req.params.id}).populate("Comments").exec(  function (err, foundblog) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundblog);

            res.render("blog",{blog:foundblog});
        }
    });
});

//Comment Route
router.post("/blog/:id/comment",function (req, res) {
    Blog_.findById(req.params.id, function(err, blog)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(req.body.com);
            Comment.create(req.body.com,
                function (err, comment)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {

                        blog.Comments.push(comment);
                        blog.save();


                        console.log(blog);
                        res.redirect("/blog/"+blog._id);



                    }
                });
        }

    });

});
module.exports = router;