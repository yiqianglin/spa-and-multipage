/**
 * Created by cc on 2017/11/2.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { setWechatTitle } from 'js/m/utils/utilsFunc';
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
  componentDidMount() {
  }

  render() {
    const { productTypeDetailList } = this.props;
    const panelClassname = classnames({
      'more-type-selector-wrp': true,
      hasProductTypeDetailList: productTypeDetailList.length > 0
    });
    return (
      <div className="morepage" id="morepage">
        <MoreTypeSelector />
        <div className={ panelClassname }>
          <MoreCooperaterPanel />
        </div>
        <QRcodePanelBottom />
      </div>
    );
  }
}
