# ganghyo-server
> 메거진 사이트를 위한 backend 입니다.
### 프로젝트 소개
+ 제작기간 : 2022-02-19 ~
### API LIST
+ 게시글
    + GET /post  게시글 전체 목록 가져오기
        + res { 게시글 전체 } 
    + POST /post 게시글 추가
        + req { 작성자ID, 이미지URL, 본문내용 }
    + GET /post/:postId 상세 게시글 가져오기 
        + req { 작성자ID, 이미지URL, 본문내용 }
    + DELETE /post/:postId 게시글 삭제
        + req { 포스트ID  }
    + PUT /post/:postId 게시글 수정
        + req { 포스트ID, 이미지 위치, 이미지, 본문내용 }
        
+ 좋아요
    + GET /post/:postId/like 게시글의 좋아요 가져오기
        + res { 해당 게시물의 좋아요 수 }
    + POST /post/:postId/like 
    > 좋아요를 누르면 like 테이블에 누른사람 ID, postId 저장 누른 상태에서 한번 더 누르면 컬럼 삭제 
    > 삭제도 post로 해도 되는지? 아니면 put으로 만들어야 하는지? 아니면 delete를 만들어줘야 하는지?
+ 회원 관리
    +  POST /register 회원가입
        + req { 아이디, 닉네임, 비밀번호, 비밀번호 확인}
    +  POST /login    로그인
        + req { 아이디, 비밀번호}, res { jwt 토큰 } 
### DB TABLE

<img src="https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F13767840-947e-4bf8-9902-8b3df273a1b2%2FUntitled.png?table=block&id=bc72d738-f4e3-4693-8683-a0d80d15342a&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2"  width="700" height="370">

### 회고
