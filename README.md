<h1>Spring Boot 와 React 게시판 프로젝트<br></h1>

<h3>개발 환경: <br></h3>
  <h4>프론트 엔드)<br></h4>
      &nbsp;&nbsp; &nbsp;&nbsp; 리액트, 부트스트랩<br>
 <h4>백엔드)<br><h4>
     &nbsp;&nbsp;  &nbsp;&nbsp; JAVA: Spring Boot 2.5.3, JDK 1.8, axios<br>
      &nbsp;&nbsp; &nbsp;&nbsp; DB: MYSQL(AWS EC2에 MySQL설치해서 사용했습니다. 로컬아닌 DB연결되어있습니다.)<br>
       &nbsp;&nbsp; &nbsp;&nbsp;사용 라이브러리: log4JDBC, mybatis<br>
 
   &nbsp;&nbsp; &nbsp;&nbsp;기능 구현: <br>
     &nbsp;&nbsp; &nbsp;&nbsp;  1) 게시판 등록, 리스트 보기, 상세 보기 <br>
    &nbsp;&nbsp;  &nbsp;&nbsp;  2) 게시판 수정 및 삭제 : 게시판 상세보기에서 수정하기 누른 후 작성자 이름을 Promt창에 입력후 맞으면 수정하기 페이지로 이동.<br>
      &nbsp;&nbsp;         &nbsp;&nbsp;    &nbsp;&nbsp;            게시판 상세보기에서 삭제하기 누른 후 작성자 이름을 Promt창에 입력후 맞으면 삭제.<br>
      &nbsp;&nbsp; &nbsp;&nbsp; 3) 게시판 페이징 처리(페이지 숫자 API로 넘겨줌으로 구현).<br>
     &nbsp;&nbsp;  &nbsp;&nbsp; 4) 게시판 검색기능(리액트 함수로 구현).<br>
    
