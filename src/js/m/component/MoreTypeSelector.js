/**
 * Created by cc on 2017/11/2.
 */
import React, { Component } from 'react';
import { when } from 'mobx';
import { getUrlParameter } from 'js/m/utils/utilsFunc';
import classnames from 'classnames';

import { inject, observer } from 'mobx-react';

import 'css/m/moreTypeSelector.scss';

@inject((stores) => {
  const props = {
    dataList: stores.cooperaterStore.dataList,
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
  constructor(props) {
    super(props);
    this.state = {
      isSelectAll: false
    };
  }
  componentDidMount() {
    when(
      () => { return this.props.productTypeList.length; },
      () => {
        if (getUrlParameter('productTypeId').productTypeId) { // 如果url有查找参数
          const productTypeSelect = this.props.productTypeList.filter((result) => { // 找到productTypeList里面对应查询id是否存在
            return Number(result.productTypeId) === Number(getUrlParameter('productTypeId').productTypeId);
          })[0];
          if (productTypeSelect) {
            this.setState({ isSelectAll: false });
            this.props.getProductTypeDeatil(Number(getUrlParameter('productTypeId').productTypeId));
            document.getElementById('type-selector-ul').scrollLeft = document.getElementById(`type-selector-li-${productTypeSelect.productTypeId}`).offsetLeft;
          } else {
            this.productTypeSelectAll();
          }
        } else { // 没有url则根据之前选择的productTypeIdSelected或者获取全部
          const temp = '';
          if (this.props.productTypeSelected) {
            this.setState({ isSelectAll: false });
            this.props.getProductTypeDeatil(this.props.productTypeSelected);
            document.getElementById('type-selector-ul').scrollLeft = document.getElementById(`type-selector-li-${productTypeSelect.productTypeId}`).offsetLeft;
          } else {
            this.productTypeSelectAll();
          }
        }
      }
    );
  }
  productTypeLiClickHandler(productTypeId) {
    this.setState({ isSelectAll: false });
    this.props.getProductTypeDeatil(productTypeId);
  }
  productTypeSelectAll() {
    this.setState({ isSelectAll: true });
    this.props.dataList.set('productTypeSelected', null);
    this.props.dataList.set('productTypeDeatilList', []);
    this.props.dataList.set('productTypeDeatilSelected', null);
    this.props.getProductList();
  }
  render() {
    const {
      productTypeList,
      productTypeDetailList,
      productTypeSelected,
      productTypeDeatilSelected
    } = this.props;
    const { getProductTypeDeatil, getProductList } = this.props;
    // console.log('一级分类', productTypeList, productTypeSelected);
    // console.log('二级分类', productTypeDetailList, productTypeDeatilSelected);
    const selectAllClassname = classnames({
      'type-selector-li': true,
      selected: this.state.isSelectAll
    });
    const panelClassname = classnames({
      'detail-type-selector-animation-wrp': true,
      hasProductTypeDetailList: productTypeDetailList.length > 0
    });
    return (
      <div className="more-type-selector">
        <div className="type-selector-wrp ">
          <ul className="type-selector-ul" id="type-selector-ul">
            <li className={selectAllClassname} onClick={ () => this.productTypeSelectAll() }>全部</li>
            {
              productTypeList && productTypeList.length ? productTypeList.map((elem, index) => {
                const liClassname = classnames({
                  'type-selector-li': true,
                  [`type-selector-li-${elem.productTypeId}`]: true,
                  selected: productTypeSelected === elem.productTypeId,
                });
                return (
                  <li className={liClassname} id={`type-selector-li-${elem.productTypeId}`} key={index} onClick={ () => this.productTypeLiClickHandler(elem.productTypeId) }>{elem.name}</li>
                );
              }) : null
            }
          </ul>
        </div>
        <div className={ panelClassname }>
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
        </div>
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
