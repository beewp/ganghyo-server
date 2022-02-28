const { checkLogin, checkNotLogin } = require("../../middlewares/CheckLoginedMiddlewares");

describe("checkLogin",()=>{
    const res = {
        locals: jest.fn(() => userId="test1"),
        status: jest.fn(()=> res),
        json: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();
    test("로그인이 방법이 bearer가 아니면 res.send",()=>{
        const req = {
            headers: {
                authorization: "Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            }
        }
        checkLogin(req, res, next);
        expect(res.status).toBeCalledWith(401);
    });
    test("토큰 key가 다르면 res.send",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzXZLz0MCOcsKR7sU"
            }
        }
        checkLogin(req, res, next);
        expect(res.status).toBeCalledWith(401);
    });

    test("토큰 값이 없으면 res.send",()=>{
        const req = {
            headers: {
                authorization: ""
            }
        }
        checkLogin(req, res, next);
        expect(res.status).toBeCalledWith(401);
    });

    test("로그인 상태이면 next",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            }
        }
        checkLogin(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe("checkNotLogin",()=>{
    const res = {
        status: jest.fn(()=> res),
        json: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();
    test("로그인 상태이면 res.send",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            }
        }
        checkNotLogin(req, res, next);
        expect(res.status).toBeCalledWith(201);
    });

    test("로그인 안됐으면 next",()=>{
        const req = {
            headers: jest.fn(),
        }
        checkNotLogin(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});