/**
 * Created by Administrator on 2017/11/2 0002.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

import classnames from 'classnames';

import 'css/m/typeSelectPanel.scss';

@inject((stores) => {
  const props = {
    productTypeList: stores.cooperaterStore.dataList.get('productTypeList').toJS(),
    productTypeSelected: stores.cooperaterStore.dataList.get('productTypeSelected'),
    getProductTypeDeatil: stores.cooperaterStore.getProductTypeDeatil.bind(stores.cooperaterStore),
    isShow: stores.systemStore.popStatus.get('isShowTypeSelectPanel'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore),
  };
  return props;
}) @observer
class TypeSelectPanel extends Component {
  async clickHandler(productTypeId, hasSubType) {
    await this.props.getProductTypeDeatil(productTypeId);
    // this.props.history.push(`${contentPath}/m/cashloanmarket/more.htm?productTypeId=${productTypeId}`);
    // 将callback逻辑交给父组件处理
    this.props.callbackFromParent(productTypeId);
    this.props.togglePop('isShowTypeSelectPanel', false);
  }
  render() {
    const { productTypeList, productTypeSelected, isShow } = this.props;
    const panelClassname = classnames({
      'type-select-panel-wrp': true,
      show: isShow
    });
    return (
      <div className={panelClassname}>
        <ul className="product-type-ul">
          {
            productTypeList ? productTypeList.map((elem, index) => {
              const classname = classnames({
                'product-type-li': true,
                selected: elem.productTypeId === productTypeSelected
              });
              const iconStyle = {
                backgroundImage: `url('${elem.imageUrl}')`
              };
              return (
                <li className={`${classname} product-type-li-0${index + 1}`} key={index}>
                  <div className="product-type-con" onClick={() => this.clickHandler(elem.productTypeId)}>
                    <span className="product-type-icon" style={iconStyle}></span>
                    <span className="product-type-name">{elem.name}</span>
                  </div>
                </li>
              );
            }) : null
          }
        </ul>
      </div>
    );
  }
}

export default withRouter(TypeSelectPanel);
