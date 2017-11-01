/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
  };
  return props;
}) @observer
class HomeCooperaterPanel extends Component {
  constructor() {
    super();
    this.state = {
      indexShow: 0,
    };
  }
  render() {
    return (
      <div className="cooperator-panel-wrp">
        <div className="title">极速贷款</div>
        <ul className="cooperator-ul">
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
          <li className="cooperator-li xianjinbashi">
            <a href="javascript:void(0);" className="cooperater-link">
              <span className="remark">放水</span>
              <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/xunleijr-activity/daikuanchaoshi/m/common/qianzhan.png" alt="" className="cooperater-img" />
              <p className="cooperater-name">钱站</p>
              <p className="cooperater-remark">借款20分钟到账</p>
              <span className="go-cooperater-btn">立即贷款</span>
            </a>
          </li>
        </ul>
        <p className="bottom-remark">贷款有风险，选择需谨慎</p>
      </div>
    );
  }
}

export default HomeCooperaterPanel;
