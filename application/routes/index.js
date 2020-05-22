var express = require('express');
var router = express.Router();
var path = require("path");
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const errorPrint = require ("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root:'public/html/'});
});

router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root:'public/html/'});
});

router.get("/registration", function (req, res, next) {
  res.sendFile("registration.html", {root: "public/html" });
});

router.use('/postimage', isLoggedIn);
router.get("/postimage", function (req, res, next) {
  res.sendFile("postimage.html", {root: "public/html" });
});

module.exports = router;
