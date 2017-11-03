/**
 * Created by cc on 2017/11/2.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { setWechatTitle } from 'js/m/utils/utilsFunc';
import 'css/m/more.scss';

import MoreTypeSelector from '../component/MoreTypeSelector';
import QRcodePanelBottom from '../component/QRcodePanelBottom';
import MoreCooperaterPanel from '../component/MoreCooperaterPanel';

@inject('systemStore', 'cooperaterStore') @observer
export default class Home extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="morepage" id="homepage">
        <MoreTypeSelector />
        <MoreCooperaterPanel />
        <QRcodePanelBottom />
      </div>
    );
  }
}
