const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const UserError = require("../helpers/errors/UserError");
const PostModel = require('../model/posts');

const PostController = {
    createPost: function(req, resp, next){
        let fileUploaded = req.file.path;
        let fileAsThumbnail = `thumbnail-${req.file.filename}`;
        let destofThumbnail = req.file.destination+"/"+fileAsThumbnail;
        let title = req.body.title;
        let desc = req.body.description;
        let fk_userid = req.session.userID;

        console.log(req.session.userID);

        PostModel.create(title,desc,fileUploaded,destofThumbnail,fk_userid)
    },

    search: function(req, resp, next){
        let searchTerm = req.params.searchTerm;
        let _sql = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username \
            FROM posts p \
            JOIN users u on p.fk_userid=u.id \
            WHERE title LIKE ? OR description LIKE ?;';
        searchTerm = "%"+searchTerm+"%";
        PostModel.search(_sql, searchTerm);
    },

    recent: function(req, resp, next){
        let _sql = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username, p.created \
            FROM posts p \
            JOIN users u on p.fk_userid=u.id \
            ORDER BY p.created DESC\
            LIMIT 8';
        PostModel.recent(_sql);
    },

    getPost: function(){
        let _id = req.params.id;
        let _sql = "SELECT p.id, p.title, p.description, p.photopath, u.username, p.created \
            FROM posts p \
            JOIN users u on p.fk_userid=u.id \
            WHERE p.id=?;";
        PostModel.getPost(_sql,  _id);
    },

}

module.exports = PostController;

