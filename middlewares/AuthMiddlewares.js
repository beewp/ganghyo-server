const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_KEY);
        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        if (error.name === 'TokenExpiredError'){
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });

        }
        return res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }
};
