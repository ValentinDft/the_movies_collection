import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PopularMovies from './PopularMovies';
import PopularTV from './PopularTV';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PopularMovies}/>
        <Route path="/popular-tv" exact component={PopularTV}/>
      </Switch>
    </Router>
  );
}

export default App;
