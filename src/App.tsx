import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SvgGen from './SvgGen';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} />
        <Route path="/gen/:seed/:color" component={SvgGen} />
      </Switch>
    </Router>
  );
}
