import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardList extends Component {
    constructor(props) {
        super(props)
 
        this.state = { 
            boards: [],
            keyword:''
        }

        // 게시물 작성 버튼 클릭시 동작하는 함수
        this.BoardWrite = this.BoardWrite.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    // 서비스에 게시판 리스트 불러오기
    componentDidMount() {
        BoardService.getBoardList(this.state.search).then((res) => {
            this.setState({ boards: res.data});
        });
    }
 
    // 게시물 작성 페이지로 가기
    BoardWrite() {
        this.props.history.push('/BoardWrite/write');
    }

    // 게시물 상세보기 함수
    BoardDetail(idx){
        this.props.history.push(`/BoardDetail/${idx}`);
    }

    // 게시물 검색 리스트 함수
    BoardList(){
        this.props.history.push(`/`);
    }
    
    handleChange(e){
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
        const boardFilter = (boards) =>{
            boards = boards.filter(
                (boards) =>{
                    return boards.title.indexOf(this.state.keyword) > -1;
                }
            );
            return boards.map
        }
        return (
            <div>
                <h2 className="text-left">게시판</h2>
                <div className = "form-group">
                    <label> 검색 </label>
                    <input type="text" placeholder="제목" name="keyword" className="form-control" value={this.state.keyword} onChange={this.handleChange} style={{width:"200px"}}/>
                </div>
                <div className ="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성일 </th>
                                <th>수정일 </th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              boardFilter( this.state.boards.map)(
                                    board => 
                                    <tr key = {board.idx}>
                                        
                                        <td> {board.idx} </td>
                                        <td><button  className="btn btn-primary" onClick = {() => this.BoardDetail(board.idx)}> {board.title}</button></td>
                                        <td> {board.insertTime} </td>
                                        <td> {board.updateTime} </td>
                                        <td> {board.viewCnt} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                    <div className = "row">
                        <button className="btn btn-primary" onClick={this.BoardWrite}> 글 작성</button>
                    </div>
                </div>
        );
    }
}

export default BoardList;