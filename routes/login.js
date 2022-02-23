const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const { User } = require("../models");
const LoginedMiddleware = require("../middlewares/LoginedMiddleware");0

dotenv.config();

const router = express.Router();

router.get('/', LoginedMiddleware, async (req, res) => {
    const users = await User.findAll();

    res.json(users);
});

router.post('/', (async (req, res) => {
    const { user_id, user_pw } = req.body;

    const user = await User.findOne({
        where: {
            userId: user_id,
        }
    });
    if (!user || user_pw !== user.password) {
        return res.status(400).send({
            errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
        });
    }

    const mytoken = jwt.sign({ userId: user.userId }, "secret");
    console.log(mytoken);

    res.send({ msg: "성공", mytoken, nickname: user.nickname } );
    })
);

module.exports = router;