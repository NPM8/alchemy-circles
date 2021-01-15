import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import SvgGen from './SvgGen';

export default function App() {
  return (
    <Router>
      <Link to="/">Back</Link>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/gen/:seed/:color/:pow" component={SvgGen} />
      </Switch>
    </Router>
  );
}
