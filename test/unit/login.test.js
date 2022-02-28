const { getLogin, postLogin } = require("../../controllers/login");
jest.mock("../../models")
const { User } = require("../../models");


describe('getLogin', ()=>{
    const req = jest.fn();
    const res = {
        status: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();

    test("로그인 페이지 get", () => {
        
        getLogin(req, res, next);
        expect(res.send).toHaveBeenCalledTimes(1);
    });
});

describe("postLogin",()=>{
    const req = {
        body: {
            user_id: "test",
            user_pw: "pw1234"
        }
    }
    const res = {
        status: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();
    test("로그인 실패",async()=>{
        
        User.findOne.mockReturnValue(Promise.resolve());
        await postLogin(req, res, next);
        expect(res.status).toBeCalledWith(400);
    });

    test("로그인 성공",async()=>{
        User.findOne.mockReturnValue(Promise.resolve(user={
            userId:"test",
            password:"pw1234"
        }));
        await postLogin(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});