jest.mock("../../models")
const { User } = require("../../models");
const { postRegister } = require("../../controllers/register");

describe('postRegister', ()=>{
    const req = {
        body:{
            user_id:"test",
            nickname: "nickname",
            user_pw: "pw1234", 
        }
    }
    const res ={
        send: jest.fn(),
        status: jest.fn(()=> res),
    }
    const next = jest.fn();

    test("User 테이블에 이미 가입된 아이디가 있음", async()=>{
        User.findOne.mockReturnValue(Promise.resolve({
            userId:"test",
            password:"pw1234",
            nickname:"nickname"
        }));
        await postRegister(req,res,next);
        expect(res.status).toBeCalledWith(400);
    });


    test("회원가입 성공",async()=>{
        User.findOne.mockReturnValue(Promise.resolve());
        User.create.mockReturnValue(Promise.resolve());
        await postRegister(req,res,next);
        expect(res.status).toBeCalledWith(201);
    });
});