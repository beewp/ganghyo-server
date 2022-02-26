const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
exports.checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }

    try {
        const { userId } = jwt.verify(authToken, "secret");
        res.locals.userId = userId;
        next();
    } catch (err) {
        return res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }
};

exports.checkNotLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization){
        next();
    }else{
        res.status(201).send({msg: "login필요 상태"});
    }
}
