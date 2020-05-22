const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const UserError = require("../helpers/errors/UserError");
const UserModel = require('../model/users');

const UserController = {
    createUser: function(req, resp, next){
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

         UserModel.usernameExists(username)
         .then((result) => {
            if(result){
                return UserModel.emailExists(email);
            }else{
                throw new UserError(
                    "Failed Registration, username already exists",
                    "/register",
                    200
                );
            }
        })
        .then((hashedPassword) =>{
            return UserModel.create(username, hashedPassword, email);
        })
        .then((userWasCreated) => {
            if(userWasCreated){
                successPrint("Registration was successful");
                resp.redirect("/login");
            }else{
                throw new UserError(
                    "Failed Registration, could not be created",
                    "/register",
                    200
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
    },

    logIn: function(req, resp, next){
        let username = req.body.username;
        let password = req.body.password;
        let userID;

        //validation
        UserModel.authenticate(username, password)
        .then((userData) => {
            if(userData){
             successPrint('successful Login!');
              req.session.username = userData.user;
            req.session.userID = userData.uid;
          }else{
            throw new UserError(
               'Failed login, username or password is incorrect',
               '/login', 
               200
            );
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
    },

    logOut: function(req, resp, next){
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
    },
}

module.exports = UserController;