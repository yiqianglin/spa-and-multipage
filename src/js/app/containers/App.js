import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';

import 'css/app/app.scss';

@inject('systemStore', 'cooperaterStore') @observer
export default class App extends Component {
  componentDidMount() {
    const { systemStore, cooperaterStore } = this.props;
    console.log('app DidMount');
    cooperaterStore.getProductType();
  }

  render() {
    return (
      <div className="app-wrapper">
        {process.env.NODE_ENV === 'development' &&
          <div style={{ height: '64px' }}>
            <DevTools />
          </div>}
        {this.props.children}
      </div>
    );
  }
}
