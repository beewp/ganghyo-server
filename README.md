# ganghyo-server
> 메거진 사이트를 위한 backend 입니다.
### 프로젝트 소개
+ 제작기간 : 2022-02-19 ~ 2022-02-23
### API LIST
+ 게시글
    + GET /post  게시글 전체 목록 가져오기
        + req { }, res { 게시글 전체 } 
    + POST /post 게시글 추가
        + req { 작성자ID, 이미지URL, 본문내용 }, res { success, 메시지 }
    + GET /post/:postId 상세 게시글 가져오기 
        + req { }, res { 작성자ID, 이미지URL, 본문내용 }, res { success, 메시지 }
    + DELETE /post/:postId 게시글 삭제
        + req { 포스트ID  }, res { }
    + PUT /post/:postId 게시글 수정
        + req { 포스트ID, 이미지 위치, 이미지, 본문내용 } , res { success, 메시지 }
        
+ 좋아요
    + GET /post/:postId/like 게시글의 좋아요 가져오기
        + req { }, res { 해당 게시물의 좋아요 수 }
    + PUT /post/:postId/like 
    > 좋아요를 누르면 like 테이블에 누른사람 ID, postId 저장 누른 상태에서 한번 더 누르면 컬럼 삭제 
    > PUT 으로 만들면서 DB에 data가 있는지 확인 + db에 데이터가 있으면 삭제, 없으면 추가하는데 db 2번 접근하는게 비효율적이진 않을까? 더 좋은 방법은 없을까?

+ 회원 관리
    +  POST /register 회원가입
        + req { 아이디, 닉네임, 비밀번호, 비밀번호 확인}, res { success, 메시지 }
    +  POST /login    로그인
        + req { 아이디, 비밀번호}, res { jwt 토큰 } 
### DB TABLE

<img src="https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F13767840-947e-4bf8-9902-8b3df273a1b2%2FUntitled.png?table=block&id=bc72d738-f4e3-4693-8683-a0d80d15342a&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2">

### 회고
> 이번에는 JWT 토큰을 이용한 로그인, 관계형 DB를 사용한 게시글 작성, 게시글에 좋아요 다는 기능을 구현하였다. 가장 기초가 되는 API서버를 구현하는 시간이였다. 
> 처음 관계를 짜면서 여러 회사들의 ERD 모델을 참고했는데, 규모가 어느정도만 커져도 관계가 너무 많이 생기는게 신기하면서도 재밌었다. 그렇게 간단히 기능에 대한 ERD 모델을 만들고
> 실제로 구현하기 전에는 그래도 빨리 만들겠지 생각했는데... 아직 java script에 대한 개념, 서버에 대한 개념, db에 대한 개념, 통신에 대한 개념 모든 부분이 부족하게만 느껴졌다. 
> 
