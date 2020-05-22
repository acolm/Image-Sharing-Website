const db = require('../config/database');
const bcrypt = require('bcrypt');
const sharp = require('sharp');
const UserError = require('../helpers/errors/UseError');

const PostModel = {
    create: function(title,desc,fileUploaded,destofThumbnail,fk_userid) {
        return sharp(fileUploaded)
        .resize(200)
        .toFile(destofThumbnail)
        .then(() => {
            let baseSQ = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);'
            return db.execute(baseSQ,[title,desc,fileUploaded,destofThumbnail,fk_userid]);
        })
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                successPrint('new post created');
                resp.json({status:"OK", message:"post was created", redirect: "/"});
                //resp.redirect('/');
            }else{
                resp.json({status:"BAD", message:"post was not created", redirect: "/postimage"});
                //next(Error('post was not created'));
            }
        })
        .catch((err) => {next(err)}); 
    },

    search: function(_sql, searchTerm) {
        return db.query(_sql, [searchTerm, searchTerm])
        .then(([results, fields]) => {
            resp.json(results);
        })
        .catch((err) => next(err));
    },

    recent: function(_sql) {
        return db.query(_sql)
        .then(([results, fields]) => {
            resp.json(results);
        })
        .catch((err) => next(err));
    },

    getPost: function(_sql, _id) {
        return db.query(_sql, _id)
        .then(([results, fields]) => {
            resp.json(results[0]);
        })
        .catch((err) => next(err));
    },
}

module.exports =PostModel;