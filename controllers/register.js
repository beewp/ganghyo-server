const { User } = require("../models");
const { Op } = require("sequelize");

exports.postRegister = async (req, res) => {
    const { user_id, nickname, user_pw } = req.body;
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
    }