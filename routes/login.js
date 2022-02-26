const express = require("express");
const dotenv = require("dotenv")
const { getLogin, postLogin } = require("../controllers/login");
const { checkNotLogin } = require("../middlewares/CheckLoginedMiddlewares");


dotenv.config();

const router = express.Router();

router.get('/', checkNotLogin,getLogin);
router.post('/', checkNotLogin, postLogin);

module.exports = router;