import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardWrite extends Component {
    // 생성자
    constructor(props) {
        super(props);

        this.state = {
            idx: this.props.match.params.idx,
            title: '',
            content: '',
            writer: ''
        }

        // 버튼에 달기위한 생성자
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeWriterHandler = this.changeWriterHandler.bind(this);
        this.writeBoard = this.writeBoard.bind(this);
    }

    // 제목 state값
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    // 내용 state값
    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    // 작성자 state값
    changeWriterHandler = (event) => {
        this.setState({writer: event.target.value});
    }

    writeBoard = (event) => {
        event.preventDefault();
        let board = {
            idx: this.props.match.params.idx,
            title: this.state.title,
            content: this.state.content,
            writer: this.state.writer
        };
        
        console.log("board:" + JSON.stringify(board));
        if(this.state.idx === "write"){
             // 공백 체크
            if(board.title.trim() === ""){
                alert("제목을 입력해주세요");
            }else if(board.content.trim() === ""){
                alert("내용을 입력해주세요");
            }else if(board.writer.trim() === ""){
                alert("작성자를 입력해주세요");
            }else{
                // BoardService.writeBoard에 작성한 Board넣기 성공후 /로 
                board.idx = 0
                BoardService.writeBoard(board).then(res => {
                        this.props.history.push('/');
                }).catch(err => { 
                    alert("등록 실패했습니다."); 
                })
            }
        }else{
            // 공백 체크
            if(board.title.trim() === ""){
                alert("제목을 입력해주세요");
            }else if(board.content.trim() === ""){
                alert("내용을 입력해주세요");
            }else if(board.writer.trim() === ""){
                alert("작성자를 입력해주세요");
            }else{
                // BoardService.writeBoard에 작성한 Board넣기 성공후 /로 
                BoardService.updateBoard(this.state.idx,board).then(res => {
                        this.props.history.push('/');
                }).catch(err => { 
                    alert("수정 실패했습니다."); 
                })
            }
        }
   
    }

    cancel() {
        this.props.history.push('/');
    }

    getTitle() {
        if (this.state.idx === 'write') {
            return <h3 className="text-center">게시글 작성</h3>
        } else {
            return <h3 className="text-center">게시글 수정</h3>
        }
    }
    
    // 버튼 텍스트 수정/등록 parameter에 따라 나누기
    getButton() {
        if (this.state.idx === 'write') {
            return "등록하기"
        } else {
            return "수정하기"
        }
    }

    // board state채워
    componentDidMount() {
        if (this.state.idx === 'write') {
            return false;
        } else {
            BoardService.getBoardDetail(this.state.idx).then( (res) => {
                let board = res.data;
                this.setState({
                        writer: board.writer,
                        title: board.title,
                        content: board.content,
                        idx: board.idx
                    });
            });
        }
    }

    render() {
        return (
            <div>
                <div className = "container" style={{marginTop:"50px"}}>
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">{this.getTitle()}</h3>
                            <div className = "card-body">
                                <form >
                                    <div className = "form-group">
                                        <label> 제목 </label>
                                        <input type="text" placeholder="제목" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea placeholder="내용" name="content" className="form-control" 
                                        value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 작성자  </label>
                                        <input placeholder="작성자" name="writer" className="form-control" 
                                        value={this.state.writer} onChange={this.changeWriterHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.writeBoard}>{this.getButton()}</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>뒤로가기</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BoardWrite;