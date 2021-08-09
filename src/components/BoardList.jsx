import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardList extends Component {
    constructor(props) {
        super(props)
 
        this.state = { 
            boards: []
        }
        /* 게시물 작성 버튼 클릭시 동작하는 함수*/
        this.createBoard = this.createBoard.bind(this);
		
    }
    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data});
        });
    }

    /* 게시물 작성페이지로 이동 */
    createBoard() {
        this.props.history.push('/BoardWrite/');
    }

    render() {
        return (
            <div>
                <h2 className="text-left">게시판</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.createBoard}> 글 작성</button>
                </div>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자 </th>
                                <th>작성일 </th>
                                <th>수정일 </th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.idx}>
                                        
                                        <td> {board.idx} </td>
                                        <td> {board.title} </td>
                                        <td> {board.writer} </td>
                                        <td> {board.insertTime} </td>
                                        <td> {board.updateTime} </td>
                                        <td> {board.viewCnt} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
        );
    }
}

export default BoardList;