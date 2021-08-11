import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardDetail extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            idx: this.props.match.params.idx,
            board: {}
        }
        this.Update = this.Update.bind(this);

    }

    componentDidMount() {
        BoardService.getBoardDetail(this.state.idx).then( res => {
            this.setState({board: res.data});
        });
    }
 
    List() {
        this.props.history.push('/');
    }

    // 수정하기 function
    Update() {
        // 작성자 이름이 같을 경우 수정하기 페이지 이동가능
        var writer= prompt("작성자이름을 입력하세요", '');
        if(writer !== this.state.board.writer){
            alert("작성자 이름이 다릅니다. 수정 불가합니다.");
        }else{
            this.props.history.push('/BoardWrite/' + this.state.board.idx);
        }
    }

    // 삭제하기 function
    Delete() {
        // 작성자 이름이 같을 경우 삭제하기 가능
        var writer= prompt("작성자이름을 입력하세요",'');
        if(writer !== this.state.board.writer){
            alert("작성자 이름이 다릅니다. 삭제 불가합니다.");
        }else{               
            BoardService.deleteBoard(this.state.board.idx).then(res => {
                if(res.status === 200){
                    alert("삭제했습니다. 글 목록으로 이동을 눌러주세요"); 
                }
            }).catch(err => { 
                alert("삭제 실패했습니다."); 
            })
               
        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3" style={{marginTop:"50px"}}>
                    <h3 className ="text-center"> 글 상세보기</h3>
                    <div className = "card-body">
                    <div className = "card-body">
                                <form >
                                  <div className = "form-group">
                                        <label> 글 번호</label>
                                        <input type="text"  name="title" className="form-control" 
                                        value={this.state.board.idx} readOnly/> 
                                        작성시간: {this.state.board.insertTime}   수정시간: {this.state.board.updateTime}
                                    </div>
                                    <div className = "form-group">
                                        <label> 제목 </label>
                                        <input type="text"  name="title" className="form-control" 
                                        value={this.state.board.title} readOnly/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea  name="content" className="form-control" 
                                         value={this.state.board.content} readOnly/>
                                    </div>
                                 
                                 <button className="btn btn-primary" onClick={this.List.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                                 <button className="btn btn-success" onClick={this.Update.bind(this)} style={{marginLeft:"10px"}}>수정하기</button>
                                 <button className="btn btn-danger" onClick={this.Delete.bind(this)} style={{marginLeft:"10px"}}>삭제하기</button>
                                 
                                </form>
                            </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BoardDetail;