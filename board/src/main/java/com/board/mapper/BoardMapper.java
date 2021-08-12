package com.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.board.dto.BoardDto;

@Mapper
public interface BoardMapper {
	public List<BoardDto> getBoardList(Map param);
	public int writeBoard(BoardDto board);
	public BoardDto getBoardDetail(Long idx);
	public void increaseViewCnt(Long idx);
	public int updateBoard(BoardDto board);
	public int deleteBoard(Long idx);
	public int findAllCount();

}
