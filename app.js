const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const blogpost = require('./model/db');
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use(express.static('public'))//use public folder
app.use(bodyParser.urlencoded({extended: true})) //use body parser
const _ = require('lodash');

// const posts=[];
//home route
app.get('/', (req, res) => {
  blogpost.find({},function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      res.render('home', { title: 'Apex', message: 'Home Page!', postdata:docs })
    }
  })
  });
  // aboutUs route
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About', message: 'Hello there!' })
  })
  //contactUs route
  app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', message: 'Hello there!' })
  })
    //Compose route
    app.get('/compose', (req, res) => {
      res.render('compose', { title: 'Compose'})
    })
    //Compose Post route
    app.post('/compose',(req,res)=>{
      const postobj = new blogpost ({
        title:req.body.postTitle,
        post: req.body.post
      });
      postobj.save();
      res.redirect('/');
    })

    app.get('/posts/:postid',function(req,res){
      // let paramsTitle = _.lowerCase(req.params.postname);
      let id = req.params.postid
      blogpost.findOne({_id:id},function(err,element){ 
          res.render('post',{
            title: element.title,
            post: element.post
          })      
      })
    })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})