/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import 'css/app/homeTypeSelector.scss';

@inject((stores) => {
  const props = {
    productTypeList: stores.cooperaterStore.dataList.get('productTypeList').toJS(),
    getProductTypeDeatil: stores.cooperaterStore.getProductTypeDeatil.bind(stores.cooperaterStore)
  };
  return props;
}) @observer
class HomeTypeSelector extends Component {
  clickHandler(productTypeId, hasSubType) {
    this.props.getProductTypeDeatil(productTypeId);
  }
  render() {
    const { productTypeList } = this.props;
    return (
      <div className="home-type-selector">
        <ul className="type-selector-ul">
          {
            productTypeList ? productTypeList.map((elem, index) => (
              <li className="type-selector-li" key={index}
                  data-hassubtype={elem.hasSubType}
                  data-producttypeid={elem.productTypeId}
                  onClick={ () => this.clickHandler(elem.productTypeId, elem.hasSubType) }
              >
                {elem.name}
              </li>
            )) : null
          }
        </ul>
        <span className="select-panel-btn">
          <span className="select-panel-icon"></span>
          <p className="select-panel-remark">菜单</p>
        </span>
      </div>
    );
  }
}

export default HomeTypeSelector;
