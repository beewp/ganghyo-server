const express = require("express");
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");

const router = express.Router();

router.get("/", async (req, res) =>{
    res.send({
        msg: "ganghyo's server"
    });
});

router.get("/user/me", AuthMiddlewares, async (req, res) =>{
    const { user } = res.locals;
    res.send({
        user,
    });
});

module.exports = router;