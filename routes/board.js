const express = require("express");
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");
const { Board, Comment, Like } = require("../models")
const { Op } = require("sequelize")
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
        const post = await Board.findByPk(postId);

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
router.get('/:postId/like',async(req, res) => {
    const { postId } = req.params

    const likes = await Board.findAll({ include: [{
        model: Like,
        where: {[Op.and]: [{postId}, {check: true}]},
    }]});

    return res.json(likes);
});

router.post('/:postId/like',async (req, res) => {
    const { postId } = req.params;
    const userId = 'test1';
    const check = true;
    console.log(postId, userId, check);
    // const likes = await Like.create( {postId, userId, check} );

    return res.json(userId);
});


module.exports = router;