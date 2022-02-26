const express = require("express");
const { checkLogin } = require("../middlewares/CheckLoginedMiddlewares");
const { checkPost } = require("../middlewares/CheckInputMiddlewares");
const router = express.Router();
const { getPosts, writePost, getDetailPost, putPost, deletePost, putLike } = require("../controllers/board")

// /post
router.route('/')
    .get(getPosts)
    .post(checkLogin, writePost);

//   /post/:postId
router.route('/:postId')
    .get( getDetailPost )
    .delete(checkLogin, deletePost)
    .put(checkPost, putPost);

router.put('/:postId/like', checkLogin, putLike);


module.exports = router;