/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';

@inject((stores) => {
  const props = {
    recommendList: stores.cooperaterStore.dataList.get('recommendList').toJS(),
    clickProductReport: stores.systemStore.clickProductReport.bind(stores.systemStore),
    getProductList: stores.cooperaterStore.getProductList.bind(stores.cooperaterStore)
  };
  return props;
}) @observer
class HomeCooperaterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: new Date(2017, 10, 7, 0, 0, 0),
      nowTime: new Date()
    };
  }
  numberGenerator(baseNum) {
    let _baseNum = 0;
    if (baseNum) {
      _baseNum = baseNum;
    }
    const timestampDifference = this.state.nowTime.getTime() - this.state.startTime.getTime();
    return _baseNum + Math.floor(timestampDifference / 1000 / 60 / 5);
  }
  clickHandler(productId, url) {
    this.props.clickProductReport(productId);
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  }
  getAllProduct() {
    browserHistory.push(`${contentPath}/m/cashloanmarket/more.htm?productTypeId=all`);
    // this.props.getProductList()
    //   .then(() => {
    //     browserHistory.push(`${contentPath}/m/cashloanmarket/more.htm?productTypeId=all`);
    //   })
    //   .catch((err) => {});
  }
  render() {
    const { recommendList } = this.props;
    return (
      <div className="cooperator-panel-wrp">
        <ul className="cooperator-ul">
{/*          {
            recommendList ? recommendList.map((elem, index) => (
              <li className="cooperator-li" key={index}>
                <a href={elem.homeUrl} className="cooperater-link">
                   <span className="remark">放水</span>
                  <img src={elem.imageUrl} alt="" className="cooperater-img" />
                  <p className="cooperater-name">{elem.name}</p>
                  <p className="cooperater-remark">{elem.description}</p>
                  <a className="go-cooperater-btn">立即贷款</a>
                </a>
              </li>
            )) : null
          } */}
          {
            recommendList ? recommendList.map((elem, index) => {
              return (
                <li className="cooperator-li" key={index}>
                  {
                    elem.recommendFlag ? <span className="remark">{elem.recommendFlag}</span> : null
                  }
                  <img src={elem.imageUrl} alt="" className="cooperater-img" />
                  <p className="cooperater-name">{elem.mainDescription}</p>
                  <p className="cooperater-remark">{elem.description}</p>
                  <p className="cooperater-count">已有{this.numberGenerator(elem.shownCardinalNo)}人申请</p>
                  <a href="javascript:void(0);" className="go-cooperater-btn" onClick={() => this.clickHandler(elem.productId, elem.mobileUrl)}>立即贷款</a>
                </li>
              );
            }) : null
          }
        </ul>
        <p className="bottom-remark" onClick={() => this.getAllProduct()}><span className="more-icon"></span><span className="art">查看更多贷款</span></p>
      </div>
    );
  }
}

export default HomeCooperaterPanel;
