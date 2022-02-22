const SocketIO = require('socket.io');
module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io', cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });
  app.set('io', io);

  io.use((socket, next) => {

  });

  io.on('connection', (socket) => { // 웹소켓 연결 시
    const req = socket.request;
    console.log('새로운 클라이언트 접속!', socket.id);

    socket.on('disconnect', () => { // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => { // 에러 시
      console.error(error);
    });
  });
};