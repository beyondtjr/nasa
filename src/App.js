import React, { Component } from 'react';
import './App.css';
import About from './About'
import Contact from './Contact'
import Info from './Info'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import neoData from './sample-neo'
import issData from './iss-location'
import {
  PageHeader,
  Table,
  Navbar,
  Indicators
} from 'react-bootstrap'

class App extends Component {

  render() {
    return (
      <div className = "Main">
        <Navbar>
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/Home">Home</a>
              <a class="navbar-brand" href="/Info">Space Stuff</a>
              <a class="navbar-brand" href="/About">About</a>
              <a class="navbar-brand" href="/Contact">Contact</a>
            </div>
          </div>
        </Navbar>

      

          <div>
            <Router>
              <Switch>
                <div>
                  <Route exact path="/About" component = {About}/>
                  <Route exact path="/Contact" component = {Contact}/>
                  <Route exact path="/Info" component = {Info}/>
                </div>
              </Switch>
            </Router>

          </div>

      </div>
    );
  }
}

export default App;
