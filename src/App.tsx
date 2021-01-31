import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SvgGen from './SvgGen';
import HistoryPage from './HistoryPage';
import MenuComponent from './components/Menu';
import TitleComponent from './components/Title';

const { Header } = Layout;

export default function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <TitleComponent />
          <MenuComponent />
        </Header>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/gen/:seed/:color/:pow/:background" component={SvgGen} />
        </Switch>
      </Layout>
    </Router>
  );
}
