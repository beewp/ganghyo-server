const { checkLogin } = require("./CheckLoginedMiddlewares");

exports.checkPost = (req, res, next) => {
  const { img_position, post_content, post_img } = req.body;

  checkLogin(req, res, next);

  if (!img_position) {
    return res.status(200).send({
      msg: "이미지 위치가 없습니다.",
    });
  }
  if (!post_img) {
    return res.status(200).send({
      msg: "사진이 없습니다.",
    });
  }
  if (!post_content) {
    return res.status(200).send({
      msg: "게시글 내용이 없습니다.",
    });
  }

  next();
}

exports.checkRegister = (req, res, next) => {
  const { user_id, nickname, user_pw, pw_check } = req.body;
  const exptext = /^[A-Za-z0-9]/;

  if (user_id.length < 4) {
    return res.status(200).send({
      msg: "아이디는 4자 이상입니다.",
    });
  }
  if (nickname.length < 3 || exptext.test(nickname) === false) {
    return res.status(200).send({
      msg: "닉네임은 4자 이상 영어 및 숫자만 가능합니다.",
    });
  }
  if (!user_pw) {
    return res.status(200).send({
      msg: "패스워드를 적어주세요.",
    });
  }
  if (user_pw !== pw_check) {
    return res.status(200).send({
      msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
    });
  }
  next();
}
