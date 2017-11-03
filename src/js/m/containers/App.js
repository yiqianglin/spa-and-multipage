import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import 'css/m/index.scss';

import TypeSelectPanel from '../component/TypeSelectPanel';

@inject('systemStore', 'cooperaterStore') @observer
export default class App extends Component {
  componentDidMount() {
    const { systemStore, cooperaterStore } = this.props;
    console.log('m DidMount');
    this.props.cooperaterStore.getProductType();
  }

  render() {
    return (
      <div className="app-wrapper">
        {process.env.NODE_ENV === 'development' &&
          <div style={{ height: '64px' }}>
            <DevTools />
          </div>}
        {this.props.children}
        <TypeSelectPanel />
      </div>
    );
  }
}
