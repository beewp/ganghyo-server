const express = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

router.post('/',(async (req, res) => {
    const { user_id, nickname, user_pw } = req.body;
    const exptext = /^[A-Za-z0-9]/;

    if (nickname.length < 3 || exptext.test(nickname) === false ){
      return res.status(400).send({
            errorMessage: "닉네임 작성 규칙을 따라주세요.",
          });
    }
    // if (user_pw !== confirmd_user_pw) {
    //   res.status(400).send({
    //     errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
    //   });
    //   return;
    // }
  
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
    
    console.log(req.body);
    const user = await User.create({ userId: user_id, nickname, password: user_pw });
    console.log(user);
    res.status(201).send({ success: true });      
    })
);

module.exports = router;