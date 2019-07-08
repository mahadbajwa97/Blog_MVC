
var mongo= require('Mongoose');

var Blog=new mongo.Schema({
    blog_title: String,
    AuthorName: String,
    Comments:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    Blog_sections:
        [{


            section_text: String,
            section_image: String

        } ]
});

module.exports = mongo.model("Blog", Blog);