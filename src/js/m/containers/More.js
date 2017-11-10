/**
 * Created by cc on 2017/11/2.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { setWechatTitle, getUrlParameter } from 'js/m/utils/utilsFunc';
import classnames from 'classnames';
import 'css/m/more.scss';

import MoreTypeSelector from '../component/MoreTypeSelector';
import QRcodePanelBottom from '../component/QRcodePanelBottom';
import MoreCooperaterPanel from '../component/MoreCooperaterPanel';

@inject((stores) => {
  const props = {
    productTypeDetailList: stores.cooperaterStore.dataList.get('productTypeDeatilList').toJS(),
  };
  return props;
})
export default class Home extends Component {
  componentWillMount() {
  }
  componentDidMount() {
    // console.log(getUrlParameter('productTypeId'));
    document.getElementById('app-wrapper').scrollTop = 0;
    // document.getElementById('type-selector-ul').scrollLeft  = document.getElementById('type-selector-li-3').offsetLeft
  }
  goHomePage() {
    browserHistory.push(`${contentPath}/m/cashloanmarket/index.htm`);
  }

  render() {
    const { productTypeDetailList } = this.props;
    const panelClassname = classnames({ // 二级分类动画
      'more-type-selector-wrp': true,
      hasProductTypeDetailList: productTypeDetailList.length > 0
    });
    return (
      <div className="morepage" id="morepage">
        <MoreTypeSelector />
        <div className={ panelClassname }>
          <MoreCooperaterPanel />
        </div>
        <div className="go-homepage-wrp">
          <p className="bottom-remark" onClick={() => { this.goHomePage(); }}><span className="more-icon"></span><span className="art">回到首页</span></p>
        </div>
        <QRcodePanelBottom />
      </div>
    );
  }
}
