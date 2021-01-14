import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SvgGen from './SvgGen';

const Hello = () => {
  return (
    <div>
      Test <SvgGen />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
