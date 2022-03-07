const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    author: String,
    title: String,
    body: String,
    image: String,
    createdAt: Date
});

module.exports = mongoose.model('posts', BlogPost)

// const MyBlog = mongoose.model('posts', BlogPost);

// const instance = new MyBlog();
// instance.my.key = 'hello';
// instance.save(function(err) {
//     //
// });