const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

const cors = require("cors");

// whitelis =[];

// const corsOptions = {
//     origin: '*', //이부분에 사이트 url이 필요
//     Credentials: true
// }

const SocketIO = require('./socket');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const boardRouter = require('./routes/board');

port = 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/post", boardRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

// app.use((req, res, next) =>{
//     const error = new Error("잘못된 접근입니다");
//     error.status(404);
//     next(error);
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack); // 에러 메시지 표시
//     res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
// });

const server = app.listen(port, () => {
    console.log(port, "Server on");
});

SocketIO(server, app);