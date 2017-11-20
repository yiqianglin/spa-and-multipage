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
    getProductList: stores.cooperaterStore.getProductList.bind(stores.cooperaterStore),
    getProductListAll: stores.cooperaterStore.getProductListAll.bind(stores.cooperaterStore),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
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
            if (document.getElementById(`type-selector-li-${productTypeSelect.productTypeId}`)) {
              this.animationScroll('type-selector-ul', `type-selector-li-${productTypeSelect.productTypeId}`);
            } else {
              setTimeout(() => {
                this.animationScroll('type-selector-ul', `type-selector-li-${productTypeSelect.productTypeId}`);
              }, 200);
            }
          } else {
            this.productTypeSelectAll();
          }
        } else { // 没有url则根据之前选择的productTypeIdSelected或者获取全部
          const temp = '';
          if (this.props.productTypeSelected) {
            this.setState({ isSelectAll: false });
            this.props.getProductTypeDeatil(this.props.productTypeSelected);
            if (document.getElementById(`type-selector-li-${this.props.productTypeSelected}}`)) {
              this.animationScroll('type-selector-ul', `type-selector-li-${this.props.productTypeSelected}`);
            } else {
              setTimeout(() => {
                this.animationScroll('type-selector-ul', `type-selector-li-${this.props.productTypeSelected}`);
              }, 200);
            }
          } else {
            this.productTypeSelectAll();
          }
        }
      }
    );
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(window.animationFrame);
  }
  componentWillReceiveProps(nextProps){ // more页面打开typeSelectPanel面板，兼容url没改变，顶部选择栏变化
    if (this.props.productTypeSelected !== null && nextProps.productTypeSelected !==null && nextProps.productTypeSelected === this.props.productTypeSelected) {
      if (document.getElementById(`type-selector-li-${nextProps.productTypeSelected}}`)) {
        this.animationScroll('type-selector-ul', `type-selector-li-${nextProps.productTypeSelected}`);
      } else {
        setTimeout(() => {
          this.animationScroll('type-selector-ul', `type-selector-li-${nextProps.productTypeSelected}`);
        }, 200);
      }
    }
  }
  animationScroll(parentDomId, childDomId, lastStepScroll) {
    const $parentDom = document.getElementById(parentDomId);
    const $childDom = document.getElementById(childDomId);

    const currentScroll = $parentDom.scrollLeft;
    const needScroll = $childDom.offsetLeft - (window.screen.width / 2) + ($childDom.offsetWidth / 2);
    let cardinalNumber = 0;
    if (needScroll > 20) { // 根据需要移动的距离，调整基数
      cardinalNumber = 20;
    } else {
      cardinalNumber = 10;
    }
    if (needScroll != currentScroll && lastStepScroll !== currentScroll && (needScroll > currentScroll + (needScroll / cardinalNumber))) {
      $parentDom.scrollLeft = currentScroll + (needScroll / cardinalNumber);
      window.animationFrame = window.requestAnimationFrame(() => { this.animationScroll(parentDomId, childDomId, currentScroll); });
    } else if (needScroll != currentScroll && lastStepScroll !== currentScroll && needScroll < currentScroll){
      const difference = currentScroll - needScroll;
      $parentDom.scrollLeft = currentScroll - (difference / cardinalNumber);
      window.animationFrame = window.requestAnimationFrame(() => { this.animationScroll(parentDomId, childDomId, currentScroll); });
    }
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
    this.props.getProductListAll();
  }
  scrollToPanelTop() {
    document.getElementById('app-wrapper').scrollTop = 0;
  }
  showTypeSelectPanel() {
    this.props.togglePop('isShowTypeSelectPanel', true);
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
            <li id="type-selector-li-all" className={selectAllClassname} onClick={ () => {
              this.productTypeSelectAll();
              this.animationScroll('type-selector-ul', 'type-selector-li-all');
            } }>全部</li>
            {
              productTypeList && productTypeList.length ? productTypeList.map((elem, index) => {
                const liClassname = classnames({
                  'type-selector-li': true,
                  [`type-selector-li-${elem.productTypeId}`]: true,
                  selected: productTypeSelected === elem.productTypeId,
                });
                return (
                  <li className={liClassname} id={`type-selector-li-${elem.productTypeId}`} key={index} onClick={ () => {
                    this.productTypeLiClickHandler(elem.productTypeId);
                    setTimeout(() => {
                      this.scrollToPanelTop();
                      this.animationScroll('type-selector-ul', `type-selector-li-${this.props.productTypeSelected}`);
                    }, 0);
                  } }>{elem.name}</li>
                );
              }) : null
            }
          </ul>
          <span className="select-panel-btn">
            <span className="select-panel-icon"></span>
            <p className="select-panel-remark" onClick={() => this.showTypeSelectPanel()}>菜单</p>
          </span>
        </div>
        <div className={ panelClassname }>
        {
          productTypeDetailList && productTypeDetailList.length ? (
            <div className="detail-type-selector-wrp">
              <span className="label">区间：</span>
              <ul className="detail-type-selector-ul" id="detail-type-selector-ul">
                {
                  productTypeDetailList.map((elem, index) => {
                    const liClassname = classnames({
                      'detail-type-selector-li': true,
                      selected: productTypeDeatilSelected === elem.productTypeId,
                      [`detail-type-selector-li-${elem.productTypeId}`]: true,
                    });
                    return (
                      <li className={liClassname} id={`detail-type-selector-li-${elem.productTypeId}`} key={index} onClick={ () => {
                        getProductList(productTypeSelected, elem.productTypeId);
                        setTimeout(() => {
                          this.scrollToPanelTop();
                          this.animationScroll('detail-type-selector-ul', `detail-type-selector-li-${this.props.productTypeDeatilSelected}`);
                        }, 0);
                      }
                    }>{elem.name}</li>
                    );
                  })
                }
              </ul>
            </div>
          ) : null
        }
        </div>
      </div>
    );
  }
}

export default HomeTypeSelector;
