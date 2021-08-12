package com.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.board.configuration.PagingConfiguration;
import com.board.dto.BoardDto;
import com.board.mapper.BoardMapper;



@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api")
public class BoardController {

	@Autowired
	private BoardMapper bMapper;

	private Logger log = LoggerFactory.getLogger(this.getClass());

	// 게시판 리스트 조회
	@GetMapping("/board")
	public Map getBoardList(@RequestParam(value = "p_num", required=false) Integer p_num){

		// p값이 없을 때
		if (p_num == null || p_num <= 0) p_num = 1;

		//
		Map result = null;
		PagingConfiguration page = new PagingConfiguration(p_num, 5, 5); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

		// 해쉬맵으로 시작수와, 한페이지에 게시글 개수 보내기
		Map param = new HashMap<String,Integer>();
		param.put("StartNum", page.getObjectStartNum());
		param.put("countPerPage",  page.getObjectCountPerPage());

		// 리턴값 배열에 담기
		List<BoardDto> list = bMapper.getBoardList(param);


		//전체 게시글 담기
		int totalBoards = bMapper.findAllCount();
		page.setObjectCountTotal(totalBoards);

		// 페이징 계산해주는 함수
		page.setCalcForPaging();

		// 리스트가 비웠을때
		if (list == null || list.size() == 0) {
			return null;
		}else {
			result = new HashMap<>();
			result.put("pagingData", page);
			result.put("list", list);
		}

		return result;
	}

	// 게시글 등록
	@PostMapping("/board")
	public int writeBoard(@RequestBody BoardDto board){
		return bMapper.writeBoard(board);
	}

	// 게시글 상세보기
	@GetMapping("/board/{idx}")
	public BoardDto getBoardDetail(@PathVariable Long idx){
		bMapper.increaseViewCnt(idx);
		return bMapper.getBoardDetail(idx);
	}

	// 게시글 수정
	@PutMapping("/board/{idx}")
	public int updateBoard(@PathVariable Long idx, @RequestBody BoardDto board){
	// Mapper안에 두개의 parameter를 넘겨주면 BoardSql.xml에서 parameterType 설정시 null값이 될수있다.parameter가 2개이기때문에, 그래서 board객체 생성후 넣어준다.
		BoardDto updateBoard = board;
		updateBoard.setContent(board.getContent());
		updateBoard.setTitle(board.getTitle());
		updateBoard.setIdx(board.getIdx());
		updateBoard.setWriter(board.getWriter());
		return bMapper.updateBoard(updateBoard);
	}

	// 게시글 삭제
	@DeleteMapping("/board/{idx}")
	public int deleteBoard(@PathVariable Long idx){
		return bMapper.deleteBoard(idx);
	}
}
