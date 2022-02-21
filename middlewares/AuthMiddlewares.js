const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization ) {
        return res.status(401).send({
          errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
      }

    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_KEY);
        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        return res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }
};

