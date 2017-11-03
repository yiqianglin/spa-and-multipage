/**
 * Created by cc on 2017/11/2.
 */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';

import { inject, observer } from 'mobx-react';

import 'css/m/moreTypeSelector.scss';

@inject((stores) => {
  const props = {
    productTypeList: stores.cooperaterStore.dataList.get('productTypeList').toJS(),
    productTypeDetailList: stores.cooperaterStore.dataList.get('productTypeDeatilList').toJS(),
    productTypeSelected: stores.cooperaterStore.dataList.get('productTypeSelected'),
    productTypeDeatilSelected: stores.cooperaterStore.dataList.get('productTypeDeatilSelected'),
    getProductTypeDeatil: stores.cooperaterStore.getProductTypeDeatil.bind(stores.cooperaterStore),
    getProductList: stores.cooperaterStore.getProductList.bind(stores.cooperaterStore)
  };
  return props;
}) @observer
class HomeTypeSelector extends Component {
  render() {
    const {
      productTypeList,
      productTypeDetailList,
      productTypeSelected,
      productTypeDeatilSelected
    } = this.props;
    const { getProductTypeDeatil, getProductList } = this.props;
    console.log('一级分类', productTypeList, productTypeSelected);
    console.log('二级分类', productTypeDetailList, productTypeDeatilSelected);
    return (
      <div className="more-type-selector">
        <div className="type-selector-wrp">
          <span className="label">全部</span>
          <ul className="type-selector-ul">
            {
              productTypeList && productTypeList.length ? productTypeList.map((elem, index) => {
                const liClassname = classnames({
                  'type-selector-li': true,
                  selected: productTypeSelected === elem.productTypeId
                });
                return (
                  <li className={liClassname} key={index} onClick={ () => getProductTypeDeatil(elem.productTypeId) }>{elem.name}</li>
                );
              }) : null
            }
          </ul>
        </div>
        {
          productTypeDetailList && productTypeDetailList.length ? (
            <div className="detail-type-selector-wrp">
              <span className="label">区间：</span>
              <ul className="detail-type-selector-ul">
                {
                  productTypeDetailList.map((elem, index) => {
                    const liClassname = classnames({
                      'detail-type-selector-li': true,
                      selected: productTypeDeatilSelected === elem.productTypeId
                    });
                    return (
                      <li className={liClassname} key={index} onClick={ () => getProductList(productTypeSelected, elem.productTypeId) }>{elem.name}</li>
                    );
                  })
                }
              </ul>
            </div>
          ) : null
        }
        {/* <div className="detail-type-selector-wrp">
          <span className="label">区间：</span>
          <ul className="detail-type-selector-ul">
            <li className="detail-type-selector-li selected">不限</li>
            <li className="detail-type-selector-li">500-1000元</li>
            <li className="detail-type-selector-li">1000-2000元</li>
            <li className="detail-type-selector-li">2000-5000</li>
            <li className="detail-type-selector-li">10000-20000</li>
            <li className="detail-type-selector-li">20000-10万</li>
            <li className="detail-type-selector-li">10万以上</li>
          </ul>
        </div> */}
      </div>
    );
  }
}

export default HomeTypeSelector;
