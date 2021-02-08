import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PopularMovies from './PopularMovies';
import PopularTV from './PopularTV';

import onMovie from "./reducer/page.reducer"
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
const store = createStore(combineReducers({onMovie}));

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
