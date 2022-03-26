import React from 'react';
import ReactDOM from 'react-dom';
import App from './templetes/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Page404 } from './components/Page404';
import { Abc } from './templetes/Abc';
import { Menu } from './components/menu';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path={'/Abc/:slug/:id'} component={Abc} />
        <Route path={'/Abc/:slug'} component={Abc} />
        <Route path={'/Abc'} component={Abc} />
        <Route path={'/'} component={App} exact />
        <Route path={'*'} component={Page404} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
