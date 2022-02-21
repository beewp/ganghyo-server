const express = require("express");
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");
const { Board, Comment, } = require("../models")
const router = express.Router();


// /post
router.route('/')
//전체 게시물 찾기
    .get(async (req, res) =>{
        const posts = await Board.findAll({
            order: [["createdAt", "DESC"]],
        });

        res.json({ posts });
    })
    .post( async (req, res)=>{
        const { user_id, post_img, post_content } = req.body;

        await Board.create({ userId: user_id, img: post_img, content: post_content});

        res.json({success : true });
});
//   /post/:postId
router.route('/:postId')
    .get(async (req, res) =>{
        const { postId } = req.params;
        const post = await Board.find({ postId })
        .then(count => {
            if (!count){
                return res.status(404).send({error: '조회할 데이터가 없습니다.'});
            }
        });

        res.json({ post });
    })
    .delete( async (req, res) => {
        const { postId } = req.params;


        await Board.destroy({where: { postId }})
        .then(count => {
            if (!count){
                return res.status(404).send({error: '삭제할 데이터가 없습니다.'});
            }
        });
        res.json({ success: true });
    })
    .put( async (req, res) => {
        const { postId } = req.params;
        const { post_img, post_content } = req.body;
        await Board.update({ img : post_img, content: post_content },
             {where:{ postId, }});
        res.json({ success: true });
});
//   /post/:postId/like
router.get(':postId/like',(req, res) => {
    
});


module.exports = router;