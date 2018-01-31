import React, { Component } from 'react';
import './App.css';
import { LoginView } from './views/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Appointments from './views/Appointments';
//import {Account} from './api/Service';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authToken: null
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginView} />
          <Route path="/appointments" component={Appointments} />
        </div>
      </Router>
    );
  }
}

export default App;
