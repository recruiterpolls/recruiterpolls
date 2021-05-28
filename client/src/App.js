import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './App.css';

import Navbar from './components/navbar';
import CreatePoll from './pages/CreatePoll';
import PollAnalytics from './pages/PollAnalytics';
import MyPolls from './pages/MyPolls';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Container className="innerContainer">
          <Route exact path='/' component={MyPolls}></Route>
          <Route exact path='/createpoll' component={CreatePoll}></Route>
          <Route exact path='/analytics' component={PollAnalytics}></Route>
          <Route exact path='/login' component={LoginPage}></Route>
          <Route exact path='/register' component={RegisterPage}></Route>
        </Container>
      </Container>
    </Router>
  );
}

export default App;
