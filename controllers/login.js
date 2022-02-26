const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const { User } = require("../models");
dotenv.config();

exports.getLogin = (req, res, next) => res.send({msg:"로그인 페이지 입니다."});

exports.postLogin = async (req, res, next) => {
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
    
    res.send({ 
        msg: "성공", 
        mytoken: jwt.sign({ userId: user.userId }, "secret"), 
        nickname: user.nickname } );
    }