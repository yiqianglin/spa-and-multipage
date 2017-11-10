/**
 * Created by cc on 2017/11/3.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    cooperaterList: stores.cooperaterStore.dataList.get('cooperaterList').toJS(),
    clickProductReport: stores.systemStore.clickProductReport.bind(stores.systemStore),
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
  render() {
    const { cooperaterList } = this.props;
    return (
      <div className="cooperator-panel-wrp">
        <ul className="cooperator-ul" id="cooperator-ul">
          {
            cooperaterList ? cooperaterList.map((elem, index) => (
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
            )) : null
          }
        </ul>
      </div>
    );
  }
}

export default HomeCooperaterPanel;
