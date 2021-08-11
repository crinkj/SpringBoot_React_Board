import axios from "axios";

const Board_API = "http://localhost:8080/api/board";

class BoardService {
  // 게시글 리스트 api
  getBoardList() {
    return axios.get(Board_API);
  }

  // 게시글 작성 api
  writeBoard(board) {
    return axios.post(Board_API, board);
  }

  // 게시글 상세보기 api
  getBoardDetail(idx) {
    return axios.get(Board_API + "/" + idx);
  }

  // 게시글 수정하기 api
  updateBoard(idx, board) {
    return axios.put(Board_API + "/" + idx, board);
  }

  // 게시글 삭제하기
  deleteBoard(idx) {
    return axios.delete(Board_API + "/" + idx);
  }
}

export default new BoardService();
