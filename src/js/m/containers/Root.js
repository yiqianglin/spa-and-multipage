/**
 * Created by cc on 2017/5/5.
 */
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import * as stores from 'js/m/stores';

const rootRoute = {
  childRoutes: [
    {
      path: `${contentPath}/`,
      component: require('./App').default,
      childRoutes: [
        {
          path: 'm/cashloanmarket/index.htm',
          getComponent(nextState, cb) {
            import(/* webpackChunkName: "Home" */ './Home').then((module) => {
              cb(null, module.default);
            });
          }
        },
        {
          path: 'm/cashloanmarket/more.htm',
          getComponent(nextState, cb) {
            import(/* webpackChunkName: "More" */ './More').then((module) => {
              cb(null, module.default);
            });
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
