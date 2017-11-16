/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { setWechatTitle } from 'js/m/utils/utilsFunc';
import 'css/m/home.scss';

import HomeTypeSelector from '../component/HomeTypeSelector';
import Banner from '../component/Banner';
import HomeCooperaterPanel from '../component/HomeCooperaterPanel';
import QRcodePanelBottom from '../component/QRcodePanelBottom';

@inject((stores) => {
  const props = {
    cooperaterList: stores.cooperaterStore.dataList.get('cooperaterList').toJS(),
    productTypeName: stores.cooperaterStore.productTypeName,
    getRecommend: stores.cooperaterStore.getRecommend.bind(stores.cooperaterStore)
  };
  return props;
})
export default class Home extends Component {
  componentDidMount() {
    setWechatTitle('贷款超市');
    this.props.getRecommend(999999);
    document.getElementById('app-wrapper').scrollTop = 0;
  }

  render() {
    console.log('home:', this.props.history, this.context);
    // setTimeout(() => {
    //   this.props.history.push('/m/cashloanmarket/more.htm');
    // }, 3000);
    return (
      <div className="homepage" id="homepage">
        <HomeTypeSelector />
        <Banner />
        <div className="recommend-title">热门推荐</div>
        <HomeCooperaterPanel />
        <QRcodePanelBottom />
      </div>
    );
  }
}
