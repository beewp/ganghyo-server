const express = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");
const LoginedMiddleware = require("../middlewares/LoginedMiddleware");

const router = express.Router();

router.get("/", LoginedMiddleware, async(req, res) =>{
  res.send();
});

router.post('/', (async (req, res) => {
    const { user_id, nickname, user_pw, pw_check } = req.body;
    const exptext = /^[A-Za-z0-9]/;

    if (nickname.length < 3 || exptext.test(nickname) === false ){
      return res.status(400).send({
            errorMessage: "닉네임 작성 규칙을 따라주세요.",
          });
    }
    if (user_pw !== pw_check) {
      return res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
    }
  
    const existUsers = await User.findOne({
      where: {
        [Op.or]: [{ nickname }, { userId : user_id }],
      },
    });
    if (existUsers) {
      return res.status(400).send({
        errorMessage: "가입된 아이디 또는 닉네임이 있습니다.",
      });
    }
    await User.create({ userId: user_id, nickname, password: user_pw });
    
    return res.status(201).send({ success: true });      
    })
);

module.exports = router;