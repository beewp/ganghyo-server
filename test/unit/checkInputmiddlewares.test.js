const { checkPost, checkRegister } = require("../../middlewares/CheckInputMiddlewares");

describe("checkPost",() =>{
    const res = {
        status: jest.fn(()=> res),
        json: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();
    test("이미지 위치 정보가 없을 때 호출",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            },
            body:{
                post_content : "post_content",
                img_position :"",
                post_img : "post_img"
            },
        }
        checkPost(req, res, next);
        expect(res.status).toBeCalledWith(200);
    });

    test("사진이 없을 때 없을 때 호출",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            },
            body:{
                post_content : "post_content",
                img_position :"img_position",
                post_img : ""
            },
        }
        checkPost(req, res, next);
        expect(res.status).toBeCalledWith(200);       
    });

    test("게시글 내용이 없을 때 호출",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            },
            body:{
                post_content : "",
                img_position :"img_position",
                post_img : "post_img"
            },
        }
        checkPost(req, res, next);
        expect(res.status).toBeCalledWith(200);
        
    });

    test("완전히 통과",()=>{
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU"
            },
            body:{
                post_content : "post_content",
                img_position :"img_position",
                post_img : "post_img"
            },
        }
        checkPost(req, res, next);
        next();
        expect(res.status).toBeCalledWith(200);
    });

});

describe("checkRegister",() =>{
    const res = {
        status: jest.fn(()=> res),
        json: jest.fn(()=> res),
        send: jest.fn(),
    }
    const next = jest.fn();
    test("아이디 4자 이상이 아닙니다",()=>{
        const req = {
            body:{
                user_id : "pos",
                nickname :"nickname",
                user_pw : "1234",
                pw_check: "1234"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });

    test("닉네임은 4자 이상 영어 및 숫자만 가능합니다",()=>{
        const req = {
            body:{
                user_id : "post",
                nickname :"nic",
                user_pw : "1234",
                pw_check: "1234"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });

    test("닉네임은 영어 및 숫자만 가능합니다",()=>{
        const req = {
            body:{
                user_id : "post",
                nickname :"한글은 어때",
                user_pw : "1234",
                pw_check: "1234"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });

    test("패스워드를 적어주세요.",()=>{
        const req = {
            body:{
                user_id : "post",
                nickname :"nickname",
                user_pw : "",
                pw_check: "1234"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });

    test("패스워드가 패스워드 확인란과 동일하지 않습니다.",()=>{
        const req = {
            body:{
                user_id : "post",
                nickname :"nickname",
                user_pw : "1234",
                pw_check: "123445"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });

    test("완전히 통과",()=>{
        const req = {
            body:{
                user_id : "post",
                nickname :"nickname",
                user_pw : "1234",
                pw_check: "1234"
            },
        }
        checkRegister(req, res, next);
        expect(res.status).toBeCalledWith(200);

    });
});