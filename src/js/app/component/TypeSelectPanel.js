/**
 * Created by Administrator on 2017/11/2 0002.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import 'css/app/typeSelectPanel.scss';

@inject((stores) => {
  const props = {
    productTypeList: stores.cooperaterStore.dataList.get('productTypeList').toJS(),
    getProductTypeDeatil: stores.cooperaterStore.getProductTypeDeatil.bind(stores.cooperaterStore)
  };
  return props;
}) @observer
class TypeSelectPanel extends Component {
  clickHandler(productTypeId, hasSubType) {
    this.props.getProductTypeDeatil(productTypeId);
  }
  render() {
    const { productTypeList } = this.props;
    return (
      <div className="type-select-panel-wrp">
        <div className="product-type-con">
          <ul className="product-type-ul">
            <li className="product-type-li product-type-li-01">
              <div className="product-type-con">
                <span className="product-type-icon"></span>
                <span className="product-type-name">小额极速</span>
              </div>
            </li>
            <li className="product-type-li product-type-li-02">
              <div className="product-type-con">
                <span className="product-type-icon"></span>
                <span className="product-type-name">小额极速</span>
              </div>
            </li>
            <li className="product-type-li  product-type-li-03">
              <div className="product-type-con">
                <span className="product-type-icon"></span>
                <span className="product-type-name">小额极速</span>
              </div>
            </li>
            <li className="product-type-li  product-type-li-04">
              <div className="product-type-con">
                <span className="product-type-icon"></span>
                <span className="product-type-name">小额极速</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TypeSelectPanel;

