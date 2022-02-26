const express = require("express");
const { postRegister } = require("../controllers/register");
const { checkRegister } = require("../middlewares/CheckInputMiddlewares");
const { checkNotLogin } = require("../middlewares/CheckLoginedMiddlewares");

const router = express.Router();

router.get("/", checkNotLogin, (req, res) =>{
  res.send();
});

router.post('/', checkRegister, postRegister);

module.exports = router;