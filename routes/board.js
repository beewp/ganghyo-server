const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

dotenv.config();
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");
const { Board, Like } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'pracimgmanage',
        key(req, file, cb) {
            cb(null, `original/${Date.now()}`);
        },
    }),
});


// /post
router.get('/', async (req, res) => {
    const posts = await Board.findAll({
        order: [["createdAt", "DESC"]],
    });

    res.json({ posts });
});
router.post('/', AuthMiddlewares, upload.single('img'), async (req, res) => {
    const { user_id, post_content, img_position } = req.body;
    const img = req.file;
    if (!img){
        await Board.create({ userId: user_id, content: post_content });
    }
    await Board.create({ userId: user_id, img:img.location, content: post_content, img_position });

    res.json({ success: true });
});

//   /post/:postId
router.route('/:postId')
    .get(async (req, res) => {
        const { postId } = req.params;
        const post = await Board.findByPk(postId);

        res.json({ post });
    })
    .delete(AuthMiddlewares, async (req, res) => {
        const { postId } = req.params;

        await Board.destroy({ where: { postId } })
            .then(count => {
                if (!count) {
                    return res.status(404).send({ error: '삭제할 데이터가 없습니다.' });
                }
            });
        res.json({ success: true });
    });

router.put(AuthMiddlewares, upload.single('img'), async (req, res) => {
    const { postId } = req.params;
    const { post_content } = req.body;
    const img = req.file;
    if (!img){
        await Board.create({ userId: user_id, content: post_content });
    }
    await Board.create({ userId: user_id, img:img.location, content: post_content, img_position });
    await Board.update({ img, content: post_content },
        { where: { postId } });
    res.json({ success: true });
});
//   /post/:postId/like
router.get('/:postId/like', async (req, res) => {
    const { postId } = req.params;

    const post = await Board.findAll({
        include: [{
            model: Like,
            where: { [Op.and]: [{ postId }],
        },
        }]
    });
    const likes = post[0].dataValues.Likes;
    
    return res.json(likes.length);
});

router.put('/:postId/like', AuthMiddlewares, async (req, res) => {
    const { postId } = req.params;
    const { user_id } = req.body;

    const existLike = await Like.findOne({
        where: {
            [Op.and]: [{ postId }, { userId: user_id }],
        },
    });
    if (!existLike) {
        const likes = await Like.create({ postId, userId: user_id, check: true });
    } else {
        await Like.destroy({
            where: {
                [Op.and]: [{ postId }, { userId: user_id }],
            },
        });
    }
    // 이러면 3번 db를 이용하기 때문에 성능에 문제가 있지 않을까?


    return res.json({ success: true });
});


module.exports = router;