const express = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");
const { checkRegister } = require("../middlewares/CheckInputMiddlewares");
const { checkNotLogin } = require("../middlewares/CheckLoginedMiddlewares");

const router = express.Router();

router.get("/", checkNotLogin, async(req, res) =>{
  res.send();
});

router.post('/',checkRegister, (async (req, res) => {
  
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
    
    return res.status(201).send({ msg:"회원가입을 축하합니다.",success: true });      
    })
);

module.exports = router;