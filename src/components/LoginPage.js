import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

//import { createHashHistory } from 'history'
//export const history = createHashHistory()


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            phone:'',
            userId:''
        }
        this.goNext = this.goNext.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.moveFormPage = this.moveFormPage.bind(this);
        
		this.handleChangeUsername = this.handleChangeUsername.bind(this)
		this.handleChangePhone = this.handleChangePhone.bind(this)

    }
    goNext() {        
        document.getElementById('getNamePhone').style.visibility = "hidden";
        document.getElementById('formPage').style.visibility = "visible";
    }

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value
		})
        console.log('유저네임입력 setstate',this.state.username)
	}
 
	handleChangePhone(event) {

		if (event.target.value === ''){
			this.setState({
				phone: event.target.value
			})			
		}
	}
	handleSubmit(event) {
		event.preventDefault();
	}
    componentDidMount() {
        //console.log(username)
        //this.setState({username:this.username});
    }
    moveQuestions(event) {
        event.preventDefault();
        this.props.history.push({pathname:'/Question',
        state:{
            username:this.state.username,
            phone : this.state.phone,
            userId: this.state.username + '_' + this.state.phone
        }
        })
    }
    moveFormPage(event) {
        event.preventDefault();
        if(this.state.username===''){
            alert('이름을 입력해주세요')
            return
        }
        if(this.state.phone===''){
            alert('전화번호 뒤의 네자리를 입력해주세요')
            return
        }

        this.props.history.push({pathname:'/FormPage',
        state:{
            username:this.state.username,
            phone : this.state.phone,
            userId: this.state.username + '_' + this.state.phone
        }
        })
    }
	handleChangeUsername(event) {
		this.setState({
			username: event.target.value
		})
        console.log('유저네임입력 setstate',this.state.username)
	}
 
	handleChangePhone(event) {

		//if (event.target.value === ''){
			this.setState({
				phone: event.target.value
			})			
	//	}
	}


    render(){
    return (

        <div id="getNamePhone" >
            <h1>시작하기 전에, </h1>
            <h3>이름과 휴대폰번호 뒷자리(4자리)를 입력해주세요.</h3>


            <form  onSubmit={this.handleSubmit}>
                        <p> 이름 <input type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername} placeholder="홍길동"></input></p>
                        <p> 번호 <input type="text" name="phone" value={this.state.phone} onChange={this.handleChangePhone}placeholder="9270"></input></p>
                        <p><button className="btn btn-primary" type="submit"
                        onClick={this.moveFormPage}>
                            제출
                            </button>
                            </p>                            
            </form>
        </div>

    )
    }
}

export default withRouter(LoginPage)
