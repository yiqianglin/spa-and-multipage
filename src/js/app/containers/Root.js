/**
 * Created by cc on 2017/5/5.
 */
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import Rules from './Rules';

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: require('./App').default,
      childRoutes: [
        {
          path: 'rules.html',
          getComponent(nextState, cb) {
            require.ensure(
              [],
              (require) => {
                cb(null, require('./Rules').default);
              },
              'Rules'
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
        <Rules />
    );
  }
}

export default Root;
