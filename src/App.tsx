import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import MainPage from './MainPage';
import SvgGen from './SvgGen';

const Title = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    if (pathname.includes('index.html')) push('/');
  }, [pathname, push]);

  return <h1>ALCHEMY CIRCLE CREATOR</h1>;
};

export default function App() {
  return (
    <Router>
      <Link to="/">Back</Link>
      <Title />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/gen/:seed/:color/:pow/:background" component={SvgGen} />
      </Switch>
    </Router>
  );
}
