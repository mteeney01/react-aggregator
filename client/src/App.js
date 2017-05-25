import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App">
            <Route {...Routes.HEADER}/>
            <Route {...Routes.INDEX} />
            <Route {...Routes.POST_LIST} />
            <Route {...Routes.NEW_POST} />
            <Route {...Routes.POST_DISCUSSION} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
