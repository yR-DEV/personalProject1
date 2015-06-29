var express = require('express');
var router = express.Router();
var loginLogic = require('../public/javascripts/loginLogic.js');
var db = require('monk')('localhost/person-demo');
var loginDb = db.get('logins');

//getting the home page initially
router.get('/login', function(req, res, next){
  res.render('login/', {title: 'Login!', theErrorArr: []})
});

//get/render to the new account jade page
router.get('/login/newAccount', function (req, res, next) {
  res.render('login/newAccount', {title: "New Account!", theErrorArr: []});
});

//get/render route to the account page after you login
router.get('/login/account', function (req, res, next) {
  res.render('login/account', {title: "Your Account", theErrorArr: []});
});

//roue post/redirect to the account page when you login
router.post('/login/account', function (req, res, next) {
  var userName = req.body.userNameLoginInput;
  var passWord = req.body.userPasswordLoginInput;
  var errorArr = loginLogic.loginCheckFunction(userName, passWord);

  loginDb.find({userName: req.body.userNameLoginInput, passWord: req.body.userPasswordLoginInput}, function(err, login){
    if(login.length >= 1 ){
      console.log(login);
      res.render('login/account', {userName: userName, passWord: login.passWord, theErrorArr: []});
    } else {
      res.render('login/', {errorMessage: "Your Account Information Was Not Found! Sorry :(", theErrorArr: []});
    }
  });

  // res.render('login/account', {title: "Your Account!", theErrorArr: []});
});

//route post/redirect/render to the index page, after you create
// your account, you are redirected to login
router.post('/login', function (req, res, next) {
  var desiredUserName = req.body.userNameCreateInput;
  var desiredPassWord1 = req.body.userPasswordCreateInput2;
  var desiredPassWord2 = req.body.userPasswordCreateInput2;
  var theErrorArr = loginLogic.accountCreationCheck(desiredUserName, desiredPassWord1, desiredPassWord2);
  //console.log(theErrorArr);  console log working
  loginDb.findOne({userName: req.body.userNameCreateInput}, function(err, data){
    if(data){
      theErrorArr.push("This Username Has Already Been Taken. Please try again");
      res.render('login/newAccount', {theErrorArr: theErrorArr});
    } else {
      loginDb.insert({userName: desiredUserName,
                      passWord: desiredPassWord1});
      res.redirect('login/');
    }

  });

});

module.exports = router;
