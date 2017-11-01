/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import { setWechatTitle } from 'js/app/utils/utilsFunc';
import 'css/app/home.scss';

import HomeTypeSelector from '../component/HomeTypeSelector';
import Banner from '../component/Banner';
import HomeCooperaterPanel from '../component/HomeCooperaterPanel';
import QRcodePanelBottom from '../component/QRcodePanelBottom';

@inject('systemStore', 'cooperaterStore') @observer
export default class Home extends Component {
  componentDidMount() {
    setWechatTitle('贷款超市');
  }

  render() {
    return (
      <div className="homepage" id="homepage">
        <HomeTypeSelector />
        <Banner />
        <HomeCooperaterPanel />
        <QRcodePanelBottom />
        首页
      </div>
    );
  }
}
