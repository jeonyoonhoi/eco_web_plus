import React, {Component} from 'react';
import firebase from '../firebase';
import { createHashHistory } from 'history'
import { withRouter } from 'react-router-dom';

export const history = createHashHistory()


let username = '';
var nextQuestions = []

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
            question1: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            question2: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            question3: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            question4: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            question5: {id: '',number:'',context: '',option1show: '',option1: '',option2show: '',option2: '',explanation: '',question: '',answer: ''},
            nowNumber:'',
            selectedOption: "",
            selectedOption2: "",
            selectedOption3: "",
            selectedOption4: "",
            selectedOption5: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",

            value:'',
            useranswer:'',

            context1Submitted:"",
            context2Submitted:"",
            context3Submitted:"",
            context4Submitted:"",
            context5Submitted:""
        };
    }
    bringFunction(num) {
        var database = firebase.database();
        const questionRef = database.ref('question');

        this.setState({
            selectedOption: "",
            selectedOption2: "",
            selectedOption3: "",
            selectedOption4: "",
            selectedOption5: ""
         })
         if (this.state.nowQuestion==''){
             this.setState({nowQuestion:this.state.question1})
         }

        questionRef.on('value', (snapshot) => {
            let rows = snapshot.val();
            let newState = [];
            for (let i in rows) {
                newState.push(rows[i]);
            }

            nextQuestions = []
            for (var i = 0; i < 5; i++) {
                var nextQuestion = newState[num + i];
                nextQuestions.push(nextQuestion);
            }
           
           // console.log('nextQuestions', nextQuestions);
            this.printQuestions(nextQuestions);
            //this.changeQuestionState(nextQuestion);
        })
    }

        


    render() {
    return (

        <div>
            <div id="formPage" style={formPageStyle}>
                <h1>Questions</h1>
                <h2>{this.props.title}</h2>
            </div>
            
            <div id="questionList" style={questionListStyle}>
            <form onSubmit={this.handleFormSubmit}>
                <div id="numberSpace"><h2>문제<p>{this.state.question.number}/5</p></h2></div>
                <div id="questionSpace"><p>{this.state.question.question}</p></div>
                <div id = "option1Space" className="form-check">
                    <label>
                        <input id="optionButton" style={optionButtonStyle} type="radio" name="react-tips"
                                                value={this.state.question.option1}
                                                checked={this.state.selectedOption === this.state.question.option1}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input"/>
                            A.{this.state.question.option1show}
                    </label>
                </div>
                                
                <div id="option2Space" className="form-check">
                    <label>
                        <input id="optionButton" style={optionButtonStyle} type="radio" name="react-tips"
                                value={this.state.question.option2}
                                checked={this.state.selectedOption === this.state.question.option2}
                                onChange={this.handleOptionChange}
                                 className="form-check-input"/>
                            B.{this.state.question.option2show}
                    </label>                                    
                </div>

                <div id ="explanationId" style = {explanationStyle}>
                    <p>{this.state.question.explanation}</p>
                </div>

                <div className="form-group">
                    <button onClick={this.changeContextStates} className="btn btn-primary mt-2" type="submit">
                        답안 제출
                    </button>
                </div>
                <div className="form-group">
                    <button onClick={this.changeNumber} className="btn btn-primary mt-2" type="submit">
                            다음 문제
                    </button>
                </div>
            </form>
            </div>

            
        </div>
    )
    }

}


export default withRouter(FormPage);
const styles ={
    questionListStyle:{
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

const {optionButtonStyle,questionListStyle,formPageStyle,explanationStyle} = styles