import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from "react-router";
import Home from "./Home";
import Site from "./site/src/Site";
//import AppProducts from "./appProducts";

const createBrowserHistory = require('history/lib/createBrowserHistory')

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Site}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('root'));
