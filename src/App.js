import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';
import FormPage from "./components/FormPage";
import LoginPage from "./components/LoginPage"
import MainPage from "./components/MainPage"

import { withRouter } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter,HashRouter, Route, Switch} from 'react-router-dom';
import Page from './components/page'



import { createHashHistory } from 'history'
export const history = createHashHistory()



class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      username:'',
      phone:''
    }
  }
  render() {
    console.log('App render');
    return (



        <HashRouter>
        
          <MainPage/>
          <Switch>
            
            <Route path="/login" ><LoginPage/></Route>
            
          </Switch>
        </HashRouter>
        
    );
  }
}

export default withRouter(App);
