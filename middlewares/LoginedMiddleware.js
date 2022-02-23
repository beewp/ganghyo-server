
//로그인 되어있을 때 로그인 화면, 회원가입 화면 가지 못하게 하기
module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if ( authorization ) {
        return res.status(401).send({
          errorMessage: "잘못된 접근입니다.",
        });
      }
    next();
};
