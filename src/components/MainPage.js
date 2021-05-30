import React, {Component}  from 'react'

import { withRouter } from 'react-router-dom';
import { createHashHistory } from 'history'
export const history = createHashHistory()

class MainPage extends Component{
    
    constructor(){
        super();
        this.moveLoginPage = this.moveLoginPage.bind(this);
    }

    moveLoginPage() {
        history.push('/login')
    }
    

    render(){
        return (
            <div id="MainPageId">
                <h1>안녕하세요?</h1>
                <h3> 
                안녕하세요? 저는 환경부 산하 녹색환경안전공단에서 만들어진 시스템입니다. <br/>
                 생활 속 재활용 방법에 대한 정보를 제공하기 위하여 개발되었어요!  <br/>
                 시작해볼까요? </h3>
                <div className="form-group">
                    <button onClick={this.moveLoginPage} className="btn btn-primary mt-2" type="submit">
                        시작하기
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(MainPage);
