const mongoose = require('mongoose');
// Connection 
mongoose.connect('mongodb://localhost:27017/Blog', {

    useNewUrlParser: true
}).then(function () {
    console.log("Connection connected Successfully");
}).catch(function () {
    console.log("Connection Fail");
})

//Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        unique:true
        
    },
    post:{
        type:String,
        required:true

    }},
   { timestamps: true })

//Model
const blogpost = mongoose.model('blogpost', blogSchema);
module.exports = blogpost;