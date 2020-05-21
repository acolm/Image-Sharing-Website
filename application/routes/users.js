var express = require('express');
var router = express.Router();
const db = require("../config/database");
const bcrypt = require('bcrypt');
const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const UserError = require("../helpers/errors/UserError");

/* GET users listing. */
router.post("/register", (req, resp, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.execute("SELECT * FROM users WHERE username=?;", [username])
    .then(([results, fields]) => {
      if (results && results.length==0){
        return db.execute("SELECT * FROM users WHERE email=?;", [email]);
      } else{
        throw new UserError(
          "Failed Registration, username already exists",
          "/register",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if(results && results.length ==0) {
        return bcrypt.hash(password, 10);
      }else{
        throw new UserError(
          "Failed Registration, email already exists",
          "/register",
          200
        );
      }
    })
    .then((hashedPassword) => {
        let baseSQL = 
        "INSERT INTO users (username, email, password, created) VALUES (?,?,?, now());";
        return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if(results && results.affectedRows) {
        successPrint("Registration was successful!");
        resp.redirect("/login");
      }else{
        throw new UserError(
          "Server Error, user could not be created",
          "/register",
          500
        );
      }
    })
    .catch((err) => {
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        resp.status(err.getStatus());
        resp.redirect(err.getRedirectURL());
      }else{
        next(err);
      }
    });
});

router.post("/login", (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let userID;

  db.execute("SELECT id,password FROM users WHERE username=?",[username])
  .then(([results, fields]) => {
    if(results && results.length == 1){
      let hPassword = results[0].password;
      //console.log(results);
      //console.log(results[0]);
      //userID = results[0].id;
      return bcrypt.compare(password, hPassword);
    }else{
      throw new UserError('username or password is incorrect','/login', 200);
    }
  })
  .then((check) => {
    if(check){
      successPrint('successful Login!');
      req.session.username = username;
      req.session.userID = userID;
      req.session.save();
      console.log(req.session);
      resp.redirect('/');
    }else{
      throw new UserError('username or password is incorrect','/login', 200);
    }
  })
  .catch((err) => {
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      resp.status(err.getStatus());
      resp.redirect(err.getRedirectURL());
    }else{
      next(err);
    }
  })
});

router.post('/logout', (req, resp, next) => {
  req.session.destroy((err) => {
    if(err){
      errorPrint('Failed to destory session');
      next(err);
    }else{
      successPrint('session was destroyed');
      resp.clearCookie('csid');
      resp.redirect('/login');
    }
  })
});
module.exports = router;
