const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const { User } = require("../models/user");

dotenv.config();

const router = express.Router();

router.post('/',(async (req, res) => {
        const { email, password } = req.body;

        if (false) {
            return res.status(400).send({
                errorMessage: "이메일 또는 패스워드가 잘못됐습니다."
            });
        }

        const mytoken = jwt.sign({ }, process.env.JWT_KEY);

        res.send({mytoken});
    })
);