
var mongo= require('Mongoose');


/////////////////////////////
//////Comment Schema/////////
/////////////////////////////
var CommentSchema= new mongo.Schema({
    text: String,
    Author: String
});
module.exports = mongo.model("Comment", CommentSchema);