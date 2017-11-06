/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const QRcodeImg = require('../../../images/m/QRcode.png');

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
          <img src={QRcodeImg} alt="" className="QRcode" />
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