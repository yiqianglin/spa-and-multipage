/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    recommendList: stores.cooperaterStore.dataList.get('recommendList').toJS()
  };
  return props;
}) @observer
class HomeCooperaterPanel extends Component {
  render() {
    const { recommendList } = this.props;
    return (
      <div className="cooperator-panel-wrp">
        <ul className="cooperator-ul">
          {
            recommendList ? recommendList.map((elem, index) => (
              <li className="cooperator-li" key={index}>
                <a href={elem.homeUrl} className="cooperater-link">
                  {/* <span className="remark">放水</span> */}
                  <img src={elem.imageUrl} alt="" className="cooperater-img" />
                  <p className="cooperater-name">{elem.name}</p>
                  <p className="cooperater-remark">{elem.description}</p>
                  <span className="go-cooperater-btn">立即贷款</span>
                </a>
              </li>
            )) : null
          }
        </ul>
        <p className="bottom-remark">贷款有风险，选择需谨慎</p>
      </div>
    );
  }
}

export default HomeCooperaterPanel;
