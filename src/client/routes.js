import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import Root from './containers/Root';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';
import Photos from './containers/Photos';
import PhotosNew from './containers/PhotosNew';
import PhotosEdit from './containers/PhotosEdit';
import Design from './containers/Design';
import DesignNew from './containers/DesignNew';
import DesignEdit from './containers/DesignEdit';
import NotFound from './containers/NotFound';

export default (
  <Route component={Root}>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />

    <Route path="/" component={Dashboard}>
      <IndexRoute component={Home} />

      <Route path="photos" component={Photos}>
        <Route path="new" component={PhotosNew} />
        <Route path=":id" component={PhotosEdit} />
      </Route>

      <Route path="design" component={Design}>
        <Route path="new" component={DesignNew} />
        <Route path=":slug" component={DesignEdit} />
      </Route>
    </Route>

    <Route path="*" name="404" component={NotFound} />
  </Route>
);
