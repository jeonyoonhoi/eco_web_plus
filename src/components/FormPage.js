import React, {Component} from 'react';
import firebase from '../firebase';
import { createHashHistory } from 'history'
import { withRouter } from 'react-router-dom';
import '../App.css'

export const history = createHashHistory()


let username = '';
var nextQuestions = []
var totalCount=0


class FormPage extends Component {
    
    constructor() {
        super();
        //var context = ''

        this.state = {
            username: '',
            phone:'',
            userId:'',
            context: '',
            nowQuestion:'',
            question: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            nowNumber:0,
            selectedOption: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            useranswer:'',
            context1Submitted:false,
            context2Submitted:false,
            context3Submitted:false,
            context4Submitted:false,
            context5Submitted:false,
            isCorrect:false,
            true1:false,
            true2:false,
            true3:false,
            true4:false,
            true5:false,
            totalCount:0
            };
    this.changeQuestionState = this.changeQuestionState.bind(this);      
    this.calculScore = this.calculScore.bind(this); 
    this.bringFunction = this .bringFunction .bind(this);
    this.changeContext1 = this .changeContext1 .bind(this);
    this.changeContext2 = this .changeContext2 .bind(this);
    this.changeContext3 = this .changeContext3 .bind(this);
    this.changeContext4 = this .changeContext4 .bind(this);
    this.changeContext5 = this .changeContext5 .bind(this);
    this.printQuestions = this.printQuestions.bind(this);
    this.hideDisplay = this.hideDisplay.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.writeUserAnswer = this.writeUserAnswer.bind(this);
    this.writeUserScore = this.writeUserScore.bind(this);
    this.changeContextStates = this.changeContextStates.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.hideNextButton = this.hideNextButton.bind(this);     
    }

    calculScore(){
        console.log('calculScore 호출')
        console.log(this.state.nowQuestion)
        console.log('answer1',this.state.answer1)
        console.log('answer2',this.state.answer2)
        console.log('answer3',this.state.answer3)
        console.log('answer4',this.state.answer4)
        console.log('answer5',this.state.answer5)
        var trueA=this.state.question.answer;
        var submitA=this.state.useranswer;
        var isCorrect=false
        console.log("정답:",trueA," / 제출 : ",submitA);

        if(trueA===submitA){
            console.log("정답입니댱~!~!")
            isCorrect=true
            //this.setState({isCorrect:true})   
        }
        
        console.log("정답:",trueA," / 제출 : ",submitA," / isCorrect : ",isCorrect," / nowNUmber",this.state.nowNumber);
             if(this.state.nowNumber===0){this.setState({true1:isCorrect})}
        else if(this.state.nowNumber===1){this.setState({true2:isCorrect})}
        else if(this.state.nowNumber===2){this.setState({true3:isCorrect})}
        else if(this.state.nowNumber===3){this.setState({true4:isCorrect})}
        else if(this.state.nowNumber===4){this.setState({true5:isCorrect})}
        else {
            console.log("에러인것 같음")
        }
    }
    
    changeNumber(){
        let newNumber=this.state.nowNumber        
        console.log("S1",newNumber)
        this.checkAll();
        if(newNumber<5){
            console.log("ㅎㅎ")
            newNumber = newNumber+1 
        }
        this.calculScore();

        if(this.state.nowNumber==4){
            this.writeUserAnswer(
                this.state.userId,
                this.state.context,
                this.state.answer1,
                this.state.answer2,
                this.state.answer3,
                this.state.answer4,
                this.state.answer5
            ); 
            
            console.log(this.state.true1)
            console.log( this.state.true2)
                console.log( this.state.true3)
                    console.log( this.state.true4)
                        console.log(this.state.true5)
            this.writeUserScore(
                this.state.userId,
                this.state.context,
                this.state.true1,
                this.state.true2,
                this.state.true3,
                this.state.true4,
                this.state.true5
            );
                
            console.log('파이어베이스 저장',this.state.context4Submitted)
            // 끝까지 갔으면 번호 다시 초기화
            newNumber = 0
            this.setState({answer1: "",answer2: "",answer3: "",answer4: "",answer5: "",})

            var context = this.state.context;
            console.log("context",context)
            this.hideDisplay();

                switch(context){
                    case "편의점":
                        this.setState({"context1Submitted":true})
                        break;
                    case "배달음식":
                        this.setState({"context2Submitted":true})
                        break; 
                    case "택배":
                        this.setState({"context3Submitted":true})
                        break;
                    case "홈파티":
                        this.setState({"context4Submitted":true})
                        break; 
                    case "일상":
                        this.setState({"context5Submitted":true})
                        break; 
                }
        }


        //다음문제로 nowNumber 수 증가. option 선택 풀기, 문제도 바꾸기!
        this.setState({
            nowNumber:newNumber,
            selectedOption:'',
            nowQuestion:this.state.question
        })
    
        console.log("S2",newNumber)
        console.log(this.state.nowNumber)

        this.printQuestions(nextQuestions,newNumber);
    }

    printQuestions(nextQuestions,newNumber){        

        console.log("printQuestion - newNumber",newNumber);
        this.changeQuestionState(nextQuestions,newNumber);            
        this.onRadio();
        this.hideExplanation();//여기
        this.hideNextButton();
        this.onDisplay();
    
    }

	handleSubmit(event) {
		event.preventDefault();
	}
    componentDidMount() {
        console.log(username)
        this.setState({
            username:username
        })

    }
    changeQuestionState(getArray,num) {
        
        console.log("S3",num)
        console.log(this.state.nowNumber)

        let newA=getArray[num];
        console.log("getArray,",getArray)
        console.log("nextQuestions,",nextQuestions)
        console.log('newA',newA)
        this.setState({
            question: {id: newA["id"],number:newA["number"],context: newA["context"],option1show: newA["option1show"],option1: newA["option1"],option2show: newA["optioni2show"],option2: newA["option2"],explanation: newA["explanation"],question: newA["question"],answer: newA["answer"]}
        })
        

    }

    changeContext1() {

        this.setState({context: '편의점'})
        this.bringFunction(0);
    }
    changeContext2() {
        this.setState({context: '배달음식' })
        this.bringFunction(5);
    }
    changeContext3() {
        this.setState({context: '택배'})
        this.bringFunction(10);
    }
    changeContext4() {
        this.setState({context: '홈파티'})
        this.bringFunction(15);
    }
    changeContext5() {
        this.setState({context: '일상'})
        this.bringFunction(20);
    }

    bringFunction(num) {
        var database = firebase.database();
        const questionRef = database.ref('question');

        this.setState({
            selectedOption: "",
            number:0
         })
         if (this.state.nowQuestion==''){
             this.setState({nowQuestion:this.state.question})
         }

        questionRef.on('value', (snapshot) => {
            let rows = snapshot.val();
            let newState = [];
            for (let i in rows) {
                newState.push(rows[i]);
            }

            //초기화
            nextQuestions = []
            for (var i = 0; i < 5; i++) {
                var nextQuestion = newState[num + i];
                nextQuestions.push(nextQuestion);
            }
            
            this.printQuestions(nextQuestions,0)//여기 바꿈
           
        })
    }

    offRadio(){
        var radioList = document.getElementsByClassName('form-check-input')
        //console.log(radioList)   
        var len=radioList.length;

        for(var i=0;i<len;i++)
        {
            radioList[i].disabled=true;
        }
    }
    
    onRadio(){
        var radioList = document.getElementsByClassName('form-check-input')
        //console.log(radioList)   
        var len=radioList.length;

        for(var i=0;i<len;i++)
        {
            radioList[i].disabled=false;
        }
    }
    showExplanation(){
        document.getElementById('explanationId').style.visibility = "visible";        
    }

    hideExplanation(){
        document.getElementById('explanationId').style.visibility = "hidden";
    }
    showNextButton(){
        document.getElementById('nextButtonId').style.visibility = "visible";        
    }

    hideNextButton(){
        document.getElementById('nextButtonId').style.visibility = "hidden";
    }
    
    onDisplay() {
        document.getElementById('questionList').style.visibility = "visible";
        console.log("히히")
    }
    hideDisplay() {
        document.getElementById('questionList').style.visibility = "hidden";
        console.log("히~히")
    }

    goNext() {        
        document.getElementById('getNamePhone').style.visibility = "hidden";
        document.getElementById('formPage').style.visibility = "visible";
    }


    writeUserAnswer(user_id, context, a1, a2, a3, a4, a5) {
        console.log('wirte')
        console.log(user_id)
        console.log(this.state.userId)
        firebase
            .database()
            .ref('user_answer/' + user_id+ '/' + context)
            .set({q1: a1, q2: a2, q3: a3, q4: a4, q5: a5})
    }
    writeUserScore(user_id,context,t1,t2,t3,t4,t5){
        firebase.database().ref('user_score/'+user_id+'/'+context)
        .set({q1:t1,q2:t2,q3:t3,q4:t4,q5:t5})
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        //답을 state에 저장하자
        
        console.log('answer1',this.state.answer1)
        console.log('nowNumber',this.state.nowNumber)
        if(this.state.nowNumber===0){
            this.setState({answer1:this.state.useranswer})}
        else if(this.state.nowNumber===1){this.setState({answer2:this.state.useranswer})}
        else if(this.state.nowNumber===2){this.setState({answer3:this.state.useranswer})}
        else if(this.state.nowNumber===3){this.setState({answer4:this.state.useranswer})}
        else if(this.state.nowNumber===4){this.setState({answer5:this.state.useranswer})}
        else {
            console.log("에러인것 같음")
        }
        //바로 저장이 되지 않음 -> 그 다음에 출력됨
        console.log('this.state.number',this.state.nowNumber)
        console.log('answer1',this.state.answer1)
        console.log('answer2',this.state.answer2)
        console.log('answer3',this.state.answer3)
        console.log('answer4',this.state.answer4)
        console.log('answer5',this.state.answer5)

    }
    handleOptionChange = changeEvent => {

        console.log('selected value', changeEvent.target)
        console.log(this.state.nowNumber)

           this.setState(
                {selectedOption: changeEvent.target.value, useranswer: changeEvent.target.value}
            );
    }
    changeContextStates(){
        if (this.state.selectedOption==''){
            console.log('아무것도 선택을 안해따')
            alert("먼저 답을 골라주세요")
            return ;
        }
        console.log('handleformsubmit offradio')
        this.offRadio();
        console.log('showExplanation 함수')
        this.showExplanation();
        this.showNextButton();

    }


    /*
    checkAll(){

        console.log('여기는',this.state.context1Submitted)
        console.log('여기는',this.state.context2Submitted)
        console.log('여기는',this.state.context3Submitted)
        console.log('여기는',this.state.context4Submitted)
        console.log('여기는',this.state.context5Submitted)
        if(this.state.context1Submitted==="true" &&
            this.state.context2Submitted==="true" &&
            this.state.context3Submitted==="true" &&
            this.state.context4Submitted==="true" &&
            this.state.context5Submitted==="true")
            {
                console.log('all submitted');
                history.push({
                    pathname: '/page',
                    state: {
                        //userid: this.state.username + '_' + this.state.phonenumber
                    }
                })
            }
    }
    */
   checkAll(){
    console.log("호출됨")
    if( this.state.context==="편의점" && this.state.context1Submitted===true ){        
        var count = 0
        if(this.state.true1===true){count=count+1;console.log('tt1')};
        if(this.state.true2===true){count=count+1;console.log('tt2')};
        if(this.state.true3===true){count=count+1;console.log('tt3')};
        if(this.state.true4===true){count=count+1;console.log('tt4')};
        if(this.state.true5===true){count=count+1;console.log('tt5',count)};   

        let message = "<"+this.state.context+"> 점수 : "+count+"/5";
        alert(message);
        this.hideDisplay();
        document.getElementById('o1').style.backgroundColor = "#e4e6e8";
        document.getElementById('o1').style.color = "#303133";    
        
        totalCount=totalCount+count
    }
    if(this.state.context==="배달음식" &&this.state.context2Submitted===true){        
        var count = 0
        if(this.state.true1===true){count=count+1};
        if(this.state.true2===true){count=count+1};
        if(this.state.true3===true){count=count+1};
        if(this.state.true4===true){count=count+1};
        if(this.state.true5===true){count=count+1};   

        let message = "<"+this.state.context+"> 점수 : "+count+"/5"

        totalCount=totalCount+count
        alert(message)
        this.hideDisplay();   
        document.getElementById('o2').style.backgroundColor = "#e4e6e8";
        document.getElementById('o2').style.color = "#303133";    
  }
    if(this.state.context==="택배" &&this.state.context3Submitted===true){        
        var count = 0
        if(this.state.true1===true){count=count+1};
        if(this.state.true2===true){count=count+1};
        if(this.state.true3===true){count=count+1};
        if(this.state.true4===true){count=count+1};
        if(this.state.true5===true){count=count+1};   

        let message = "<"+this.state.context+"> 점수 : "+count+"/5"
        totalCount=totalCount+count

        alert(message)
        this.hideDisplay();   
        document.getElementById('o3').style.backgroundColor = "#e4e6e8";
        document.getElementById('o3').style.color = "#303133";    
}
    if(this.state.context==="홈파티" &&this.state.context4Submitted===true){        
        var count = 0
        if(this.state.true1===true){count=count+1};
        if(this.state.true2===true){count=count+1};
        if(this.state.true3===true){count=count+1};
        if(this.state.true4===true){count=count+1};
        if(this.state.true5===true){count=count+1};   

        let message = "<"+this.state.context+"> 점수 : "+count+"/5"
        totalCount=totalCount+count

        alert(message)
        this.hideDisplay();   
        document.getElementById('o4').style.backgroundColor = "#e4e6e8";
        document.getElementById('o4').style.color = "#303133";    
}
    if(this.state.context==="일상" &&this.state.context5Submitted===true){        
        var count = 0
        if(this.state.true1===true){count=count+1};
        if(this.state.true2===true){count=count+1};
        if(this.state.true3===true){count=count+1};
        if(this.state.true4===true){count=count+1};
        if(this.state.true5===true){count=count+1};   

        let message = "<"+this.state.context+"> 점수 : "+count+"/5"
        totalCount=totalCount+count

        alert(message)
        this.hideDisplay();  
        document.getElementById('o5').style.backgroundColor = "#e4e6e8";
        document.getElementById('o5').style.color = "#303133";    
        }

        if(this.state.context1Submitted===true 
            &&this.state.context2Submitted===true
            &&this.state.context3Submitted===true
            &&this.state.context4Submitted===true
            &&this.state.context5Submitted===true
            ){
                alert("모든 문제를 풀었습니다")
                console.log('all submitted');
                this.props.history.push({pathname:'/ScorePage',
                state:{
                    username:this.state.username,
                    phone : this.state.phone,
                    userId: this.state.username + '_' + this.state.phone,
                    totalCount:totalCount
                }})}
}


    render() {
        console.log("b~~~efore",this.props.location.state)
        this.state.username = this.props.location.state.username;
        this.state.phone = this.props.location.state.phone;
        this.state.userId = this.props.location.state.userId;

        this.checkAll();

        


        return (

            <div>

            <div id="formPage" style={formPageStyle}>
                <h1>주제를 선택해주세요</h1>
		<h3></h3>
                <div id = "questionId"><h2>{this.props.title}</h2>
                    </div>
                <input onClick={this.changeContext1} id="o1" type="button" value="편의점"/>
                <input onClick={this.changeContext2} id="o2" type="button" value="배달음식"/>
                <input onClick={this.changeContext3} id="o3" type="button" value="택배"/>
                <input onClick={this.changeContext4} id="o4" type="button" value="홈파티"/>
                <input onClick={this.changeContext5} id="o5" type="button" value="일상"/> 

                <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12">

                        <div id="questionList" style={questionListStyle}>
                        
                        <form onSubmit={this.handleFormSubmit}>
                                <div id="numberSpace"><h2>문제 {this.state.question.number} / 5</h2></div>
                                <div id="questionSpace"><h4>{this.state.question.question}</h4></div>

                                <div class = "radioClass" id = "option1Space" className="form-check">
                                    <label>
                                        <input
                                        id="option1showId"
                                        style={optionButtonStyle}
                                            type="radio"
                                            name="react-tips"
                                            value={this.state.question.option1}
                                            checked={this.state.selectedOption === this.state.question.option1}
                                            onChange={this.handleOptionChange}
                                            className="form-check-input"/> 
                                       A.{this.state.question.option1show}
                                    </label>
                                </div>
                                
                                <div class = "radioClass" id="option2Space" className="form-check">
                                    <label>
                                        <input
                                        id="option2showId"
                                        style={optionButtonStyle}
                                            type="radio"
                                            name="react-tips"
                                            value={this.state.question.option2}
                                            checked={this.state.selectedOption === this.state.question.option2}
                                            onChange={this.handleOptionChange}
                                            className="form-check-input"/>
                                       B.{this.state.question.option2show}
                                    </label>                                    
                                </div>


                                <div class="form-button">
                                    <button onClick={this.changeContextStates} className="btn btn-primary mt-2" type="submit">
                                        정답 확인
                                    </button>
                                </div>
                                </form>


                                <div id ="explanationId" style = {explanationStyle}>
                                {this.state.question.explanation}
                                </div>
                                <div id ="nextButtonId" style = {nextButtonStyle}  className="form-group">
                                    <button onClick={this.changeNumber} className="btn btn-primary mt-2" type="submit">
                                        다음 문제
                                    </button>
                                </div>   


                                
                        </div>
                    </div>
                </div>
            </div>
            </div>

                {this.props.desc}
        

            </div>


                
        );
        }
    }
export default withRouter(FormPage);

const styles ={
    questionListStyle:{
        visibility:'hidden'
    },
    nextButtonStyle:{
        visibility:'hidden'
    },
    formPageStyle:{
        visibility:'visible'
    },
    optionButtonStyle:{
        visibility:''
    },
    explanationStyle:{
        visibility:'hidden'
    }
}

const {optionButtonStyle,questionListStyle,nextButtonStyle,formPageStyle,explanationStyle} = styles
