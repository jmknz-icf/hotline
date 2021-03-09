import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Home from './pages/home';

import HotlineIndex from './pages/hotlines/dashboard';
import AllHotlines from './pages/hotlines/all';
import NewHotline from './pages/hotlines/new';

function HotlinesRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <HotlineIndex />
      </Route>
      <Route path={`${path}/all`}>
        <AllHotlines />
      </Route>
      <Route path={`${path}/new`}>
        <NewHotline />
      </Route>
    </Switch>
  );
}

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/hotlines">
        <HotlinesRouter />
      </Route>
    </Switch>
  );
}

export default Router;
