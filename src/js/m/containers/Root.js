/**
 * Created by cc on 2017/5/5.
 */
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import * as stores from 'js/m/stores';
import loadRules from 'bundle-loader?lazy&name=myChunk!./Rules';
import Bundle from './Bundle';

const Rules = (props) => (
  <Bundle load={loadRules}>
    {(Rules) => <Rules {...props}/>}
  </Bundle>
);

const routes = [
  {
    path: '/',
    component: require('./App').default,
    routes: [
      {
        path: '/m/cashloanmarket/index.htm',
        component: require('./Home').default
      },
      {
        path: '/m/cashloanmarket/more.htm',
        component: require('./More').default
      },
      {
        path: '/m/cashloanmarket/rules.htm',
        component: Rules
      }
    ]
  }
];

// module.exports = [
//   {
//     path: '/',
//     exact: true,
//     component: asyncComponent(() => import('./home'))
//   },
//   {
//     path: '/one',
//     component: asyncComponent(() => import('./one')),
//     routes: [
//       { path: '/one/child',
//         component: asyncComponent(() => import('./child'))
//       }
//     ]
//   },
//   {
//     path: '/two',
//     component: asyncComponent(() => import('./two')),
//   },
//   {
//     path: '/user',
//     component: asyncComponent(() => import('./user'))
//   },
//
// ]

class Root extends Component {
  render() {
    return (
      <Provider {...stores}>
        <BrowserRouter>
          { renderRoutes(routes) }
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
