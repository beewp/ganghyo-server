const express = require("express");

const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

dotenv.config();

const { checkLogin } = require("../middlewares/CheckLoginedMiddlewares");
const { checkPost } = require("../middlewares/CheckInputMiddlewares");
const { Board, Like, User } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// aws 스토리지 사용을 위한 코드
// AWS.config.update({
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     region: 'ap-northeast-2',
// });

// const upload = multer({
//     storage: multerS3({
//         s3: new AWS.S3(),
//         bucket: 'pracimgmanage',
//         key(req, file, cb) {
//             cb(null, `original/${Date.now()}`);
//         },
//     }),
// });


// /post
router.get('/', async (req, res) => {
    const posts = await Board.findAll({
        include: [
            {
                model: User,
                required: false,
                attributes: ["userId", "nickname"],
            },
            {
                model: Like,
                required: false,
                attributes: ["userId", "postId"],
            },
        ],
        order: [["updatedAt", "DESC"]]
    });
    console.log(posts);
    const posts_obj = posts.map((ele) => {
        const obj = {
            post_id: ele["postId"],
            userId: ele["userId"],
            post_content: ele["content"],
            post_img: ele["img"],
            img_position: ele["img_position"],
            post_like: ele["Likes"].length,
            createdAt: ele["createdAt"],
            upload_date: ele["updatedAt"],
            nickname: ele["User"]["nickname"],
        };
        return obj;
    });
    res.json({ posts: posts_obj });
});
router.post('/', checkLogin,async (req, res) => {
    try {
        const { post_content, img_position, post_img } = req.body;
        const { userId } = res.locals;
        console.log(userId, post_img, post_content, img_position);

        await Board.create({ userId, img: post_img, content: post_content, img_position });

        return res.json({ msg: "게시글 저장 성공", success: true });
    } catch (err) {
        return res.json({ msg: "알수없는 에러", success: false });
    }

});

//   /post/:postId
router.route('/:postId')
    .get(async (req, res) => {
        const postId = Number(req.params.postId);
        if (!postId) {
            return res
                .status(400)
                .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
        }
        const post = await Board.findOne({
            where: { postId },
            include: [
                {
                    model: User,
                    required: false,
                    attributes: ["userId", "nickname"],
                },
                {
                    model: Like,
                    required: false,
                    attributes: ["userId", "postId"],
                },
            ],
        });

        if (!post) {
            return res
                .status(400)
                .json({ msg: false, errorMessage: "없는 게시글 입니다." });
        }

        const post_obj = {
            post_id: post["postId"],
            userId: post["userId"],
            post_content: post["content"],
            post_img: post["img"],
            img_position: post["img_position"],
            nickname: post["User"]["nickname"],
            post_like: post["Likes"].length,
            createdAt: post["createdAt"],
            upload_date: post["updatedAt"],
        };

        res.json({ post: post_obj });
    })
    .delete(checkLogin, async (req, res) => {
        const { postId } = req.params;
        
        await Board.destroy({ where: { postId } })
            .then(count => {
                if (!count) {
                    return res.status(404).send({ error: '삭제할 데이터가 없습니다.' });
                }
            });
        res.json({ success: true });
    });

router.put(checkPost, async (req, res) => {
    const { postId } = req.params;
    const { post_content, post_img, img_position } = req.body;
    const { userId } = res.locals;
    post = await Board.findByPk(postId);
    if (userId !== post.userId ){
        return res.send({msg:" 작성자가 다릅니다. "});
    }

    await Board.update({ img: post_img, content: post_content, img_position },
        { where: { postId } });
    res.json({ success: true });
});

//   /get/:postId/like
router.get('/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user

    const existLike = await Like.findOne({
        where: {
            [Op.and]: [{ postId }, { userId }],
        },
    });
    if (!existLike) {
        return res.json({ like_check: false });
    } else {
        return res.json({ like_check: true });
    }
});

router.put('/:postId/like', checkLogin, async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user

    const existLike = await Like.findOne({
        where: {
            [Op.and]: [{ postId }, { userId }],
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