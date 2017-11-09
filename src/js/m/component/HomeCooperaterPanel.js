/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';

@inject((stores) => {
  const props = {
    recommendList: stores.cooperaterStore.dataList.get('recommendList').toJS(),
    clickProductReport: stores.systemStore.clickProductReport.bind(stores.systemStore)
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
    window.location.href = url;
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
              return (<li className="cooperator-li" key={index}>
                {
                  elem.recommendFlag ? <span className="remark">{elem.recommendFlag}</span> : null
                }
                <img src={elem.imageUrl} alt="" className="cooperater-img" />
                <p className="cooperater-name">{elem.mainDescription}</p>
                <p className="cooperater-remark">{elem.description}</p>
                <p className="cooperater-count">已有{this.numberGenerator(elem.shownCardinalNo)}人申请</p>
                <a href={elem.mobileUrl} className="go-cooperater-btn" onClick={() => this.clickHandler(elem.productId, elem.homeUrl)}>立即贷款</a>
              </li>);
            }) : null
          }
        </ul>
        <p className="bottom-remark"><Link to={`${contentPath}/m/cashloanmarket/more.htm?productTypeId=all`}><span className="more-icon"></span><span className="art">查看更多贷款</span></Link></p>
      </div>
    );
  }
}

export default HomeCooperaterPanel;
