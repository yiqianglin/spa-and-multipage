import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import 'css/m/index.scss';

import TypeSelectPanel from '../component/TypeSelectPanel';

@inject('systemStore', 'cooperaterStore') @observer
export default class App extends Component {
  componentDidMount() {
    const { systemStore, cooperaterStore } = this.props;
    this.props.cooperaterStore.getProductTypeOneStep();
  }

  render() {
    return (
      <div className="app-wrapper" id="app-wrapper">
        {process.env.NODE_ENV === 'development' &&
          <div style={{
            height: '64px',
            position: 'fixed',
            top: '0px',
            left: '0px'
          }}>
            <DevTools />
          </div>}
        {this.props.children}
        <TypeSelectPanel />
      </div>
    );
  }
}
