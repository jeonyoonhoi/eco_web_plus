import React, {Component} from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import '../App.css'


let username = '';
var nextQuestions = []

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userId:'',
            totalCount:''
        };
    }

    componentDidMount(){
        }

    render() {
        
        this.state.username = this.props.location.state.username;
        this.state.userId = this.props.location.state.userId;
        this.state.totalCount = this.props.location.state.totalCount;

        return (    
            <div id="MainPageId">
                <h1>Score</h1>
                <div >
                    <h3>{this.state.username}님의 점수는 {this.state.totalCount}/25 입니다. </h3>
                    {/* <button onClick={this.moveLoginPage} className="btn btn-primary mt-2" type="submit">
                        시작하기
                    </button> */}
                </div>
            </div>
        )
    }
}



export default withRouter(Page);

const styles ={
    questionListStyle:{
        visibility:'hidden'
    }
}

const {questionListStyle} = styles