var express = require('express');
var router = express.Router();
const db = require("../config/database");
const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/uploads")
    },
    filename: function(req, file, cb) {
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single('uploadImage') ,(req, resp, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destofThumbnail = req.file.destination+"/"+fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;

    console.log(req.session.userID);

    sharp(fileUploaded)
    .resize(200)
    .toFile(destofThumbnail)
    .then(() => {
        let baseSQ = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);'
        return db.execute(baseSQ,[title,desc,fileUploaded,destofThumbnail,fk_userid]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            successPrint('new post created');
            resp.json({status:"OK", message:"post was created", "redirect": "/"});
            //resp.redirect('/');
        }else{
            resp.json({status:"BAD", message:"post was not created", "redirect": "/postimage"});
            //next(Error('post was not created'));
        }
    })
    .catch((err) => {next(err)}); 
    
});

module.exports = router;