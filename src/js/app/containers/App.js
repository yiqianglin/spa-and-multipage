import React, { Component } from 'react';
// import { autorun } from 'mobx';
// import { inject, observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="app-wrapper">
        {_ENV_ === 'DEV' &&
          <div style={{ height: '64px' }}>
            <DevTools />
          </div>}
        {this.props.children}
      </div>
    );
  }
}
