import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardList extends Component {
    constructor(props) {
        super(props)
 
        this.state = { 
            boards: [],
            keyword:'',
            p_num: 1,
            paging: {},
        }

        // 게시물 작성 버튼 클릭시 동작하는 함수
        this.BoardWrite = this.BoardWrite.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    // 서비스에 게시판 리스트 불러오기
    componentDidMount() {
        BoardService.getBoardList(this.state.p_num).then((res) => {
            console.log(res.data.list);
            this.setState({
                 boards: res.data.list,
                 p_num: res.data.pagingData.currentPageNum,
                 paging: res.data.pagingData,
                });
        });
    }

    // 게시판 페이징 함수
    BoardList(p_num) {
        console.log("pageNum : "+ p_num);
        BoardService.getBoardList(p_num).then((res) => {
            console.log(res.data.pagingData.currentPageNum);
            console.log(res.data.pagingData);
            console.log(res.data.pagingData.currentPageNum);
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    // 페이지 처리
    viewPaging() {
        const pageNums = [];
        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }
        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()} >
            <a className="page-link" onClick = {() => this.BoardList(page)}>{page}</a>
        </li>
        ));    
    }

 
 
    // 게시물 작성 페이지로 가기
    BoardWrite() {
        this.props.history.push('/BoardWrite/write');
    }

    // 게시물 상세보기 함수
    BoardDetail(idx){
        this.props.history.push(`/BoardDetail/${idx}`);
    }
    
    handleChange(e){
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
       // 검색기능 제목과 검색창이 같을경우
       const searchBoard = (data) => {
        // 필터 기능에서는 boolean만 리턴을 해줘야된다
        data = data.filter(
            (board)=>{
                return board.title.indexOf(this.state.keyword) > -1;
            }
        )
        return data.map((board) => {
                return(
                    <tr key = {board.idx}>
                        <td> {board.idx} </td>
                        <td><button  className="btn btn-link" onClick = {() => this.BoardDetail(board.idx)}> {board.title}</button></td>
                        <td> {board.insertTime} </td>
                        <td> {board.updateTime} </td>
                        <td> {board.viewCnt} </td>
                    </tr>
                    )
        })
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
                                searchBoard(this.state.boards)
                            }
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                        
                          
                            {
                                this.viewPaging()
                            }
                          
                        </ul>
                    </nav>
                    </div>
                    <div className = "row">
                        <button className="btn btn-primary" onClick={this.BoardWrite}> 글 작성</button>
                    </div>
                </div>
        );
    }
}

export default BoardList;