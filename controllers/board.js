const { Board, Like, User } = require("../models");
const { Op } = require("sequelize");

const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");

dotenv.config();


exports.getPosts = async (req, res, next) => {
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
                attributes: ["userId"],
                include: [{
                    model: User,
                    required: false,
                    attributes: ["nickname"],
                }],
            },
        ],
        order: [["updatedAt", "DESC"]]
    });


    const posts_obj = posts.map((ele) => {
        const obj = {
            post_id: ele["postId"],
            post_content: ele["content"],
            post_img: ele["img"],
            img_position: ele["img_position"],
            createdAt: ele["createdAt"],
            upload_date: ele["updatedAt"],
            nickname: ele["User"]["nickname"],
            like_list: ele["Likes"].map((obj) =>  obj["User"].nickname),
        };
        return obj;
    });
    res.json({ posts : posts_obj });

    next();
}

exports.writePost = async (req, res, next) => {
    try {
        const { post_content, img_position, post_img } = req.body;
        const { userId } = res.locals;
        console.log(userId, post_img, post_content, img_position);

        await Board.create({ userId, img: post_img, content: post_content, img_position });

        return res.json({ msg: "게시글 저장 성공", success: true });
    } catch (err) {
        return res.json({ msg: "알수없는 에러", success: false });
    }

}

exports.getDetailPost = async (req, res, next) => {
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
                include: [{
                    model: User,
                    required: false,
                    attributes: ["nickname"],
                }],
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
        post_content: post["content"],
        post_img: post["img"],
        img_position: post["img_position"],
        nickname: post["User"]["nickname"],
        createdAt: post["createdAt"],
        upload_date: post["updatedAt"],
        like_list: post["Likes"].map((post) =>  post["User"].nickname),
    };

    res.json({ post: post_obj });
}

exports.deletePost = async (req, res, next) => {
    const { postId } = req.params;
    
    await Board.destroy({ where: { postId } })
        .then(count => {
            if (!count) {
                return res.status(404).send({ error: '삭제할 데이터가 없습니다.' });
            }
        });
    res.json({ success: true });
}

exports.putPost = async (req, res, next) => {
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
}

exports.putLike = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals

    const existLike = await Like.findOne({
        where: {
            [Op.and]: [{ postId }, { userId }],
        },
    });
    if (!existLike) {
        await Like.create({ postId, userId, check: true });
    } else {
        await Like.destroy({
            where: {
                [Op.and]: [{ postId }, { userId }],
            },
        });
    }

    return res.json({ success: true });
}

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