const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const boardRouter = require('./routes/board');
const commentRouter = require('./routes/comment');

const RequestMiddleware = (req, res, next) => {
    console.log("Request Url", req.originalUrl, "-", new Date());
    next();
}

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RequestMiddleware);

app.use("/", indexRouter);
app.use("/api/post", boardRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
// app.use("/api/comment", commentRouter);

// app.use((req, res, next) =>{
//     const error = new Error("잘못된 접근입니다");
//     error.status(404);
//     next(error);
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack); // 에러 메시지 표시
//     res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
// });

app.listen(port, () => {
    console.log(port, "Server on");
});