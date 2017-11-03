/**
 * Created by cc on 2017/5/5.
 */
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import * as stores from 'js/app/stores';

const rootRoute = {
  childRoutes: [
    {
      path: `${contentPath}/`,
      component: require('./App').default,
      childRoutes: [
        {
          path: 'app/app.entry.html',
          getComponent(nextState, cb) {
            require.ensure(
              [],
              (require) => {
                cb(null, require('./Home').default);
              },
              'Home'
            );
          }
        },
        {
          path: 'app/app.more.html',
          getComponent(nextState, cb) {
            require.ensure(
              [],
              (require) => {
                cb(null, require('./More').default);
              },
              'More'
            );
          }
        }
      ]
    }
  ]
};

class Root extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={browserHistory} routes={rootRoute} />
      </Provider>
    );
  }
}

export default Root;
