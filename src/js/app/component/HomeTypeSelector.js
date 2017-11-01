/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import 'css/app/homeTypeSelector.scss';

@inject((stores) => {
  console.log(stores);
  const props = {
    productTypeList: stores.cooperaterStore.dataList.get('productTypeList').toJS()
  };
  return props;
}) @observer
class HomeTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.name = 'sdfs';
  }
  clickHandler() {
    console.log(this);
  }
  render() {
    const { productTypeList } = this.props;
    console.log(this.props.productTypeList);
    return (
      <div className="home-type-selector">
        <ul className="type-selector-ul">
          {
            productTypeList ? productTypeList.map((element, index) => (
              <li className="type-selector-li" key={index} data-hassubtype={element.hasSubType} onClick={this.clickHandler.bind(this)}>
                {element.name}
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
