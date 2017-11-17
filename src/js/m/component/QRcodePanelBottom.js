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
class QRcodePanelBottom extends Component {
  render() {
    return (
      <div className="QRcode-wrp">
        <div className="inner-wrp">
          <div className="QRcode-dec">
            <img src="https://xl-games.oss-cn-hangzhou.aliyuncs.com/qrcode/QRcode-common-min.jpg" alt="" className="QRcode" />
          </div>
          <div className="art-right">
            <p className="art">长按二维码，关注“来这有钱”</p>
            <p className="art">最新、最全贷款信息</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QRcodePanelBottom;
