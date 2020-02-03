var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
//var session = require('express-session');
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
var path = require('path');

app.set('views','./views');
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['Your secret key'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hrs
}));

var Users = [];

app.get('/signup', function(req, res){
   res.render('signup',{message: 'hola'});
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});

function checkSignIn(req, res, next){
   if(req.session.user){
       console.log(req.session.user);
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}

app.get('/protected_page', checkSignIn, function(req, res){
   res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){
   console.log(Users);
   if(!req.body.id || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
            res.redirect('/protected_page');
         }
      });
      res.render('login', {message: "Invalid credentials!"});
   }
});

app.get('/logout', function(req, res){
   /*req.session.destroy(function(){
      console.log("user logged out.")
   });*/
    req.session = null;
    console.log("user logged out.")
   res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

app.listen(3000);
