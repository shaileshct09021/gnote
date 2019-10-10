import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import GNotesPage from './components/GNotesPage/GNotesPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          G-Notes
        </header>
        <BrowserRouter>
          <Switch>
            <Route path={`/login`} exact>
              <LoginPage />
            </Route>
            <Route path={`/`} exact>
              <Redirect to={`/login`} />
            </Route>
            <Route path={`/home`} exact>
              <GNotesPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
