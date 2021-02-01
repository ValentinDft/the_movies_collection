import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PopularMovies from './PopularMovies';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PopularMovies}/>
        {/* <Route path="/top-rated" component={TopRated}/>
        <Route path="/popular-tv" component={PopularTV}/>
        <Route path="/top-rated-tv" component={TopRatedTV}/> */}
      </Switch>
    </Router>
  );
}

export default App;
