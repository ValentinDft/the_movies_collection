import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PopularMovies from './PopularMovies';
import PopularTV from './PopularTV';

import onMovie from "./reducer/onMovie.reducer"
import onSerie from "./reducer/onSerie.reducer"
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
const store = createStore(combineReducers({onMovie, onSerie}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={PopularMovies}/>
          <Route path="/popular-tv" exact component={PopularTV}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
