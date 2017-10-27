/**
 * Created by cc on 2017/4/17.
 */

import React, { Component } from 'react';

export default class Rules extends Component {
  render() {
    return (
      <div className="rules-wrapper">
        <ul className="rules-ul">
          <li className="rules-li">
            <div className="title">1、积分能为我带来什么？</div>
            <div className="art-con">
              <p className="art">小小分积分可以为你赢来大大的福分，因为积分：</p>
              <p className="art indent"><span className="left">1）</span>能够用来体验各种小游戏，畅享游戏的乐趣</p>
              <p className="art indent"><span className="left">2）</span>能够用来体验各种小游戏，畅享游戏的乐趣</p>
              <p className="art indent"><span className="left">3）</span>能够用来体验各种小游戏，畅享游戏的乐趣畅享游戏的乐畅享游戏的乐畅享游戏的乐畅享游戏的乐</p>
            </div>
          </li>

          <li className="rules-li">
            <div className="title">2、您可以通过如下方式获取积分：</div>
            <div className="art-con no-padding-right">
              <p className="art"><span className="icon date"></span>小小分积分可以为你赢来大大的福分，因为积分：</p>
              <p className="art"><span className="icon credit"></span>小小分积分可以为你赢来大大的福分，因为积分上岛咖啡健身卡金风科技的撒雷锋精神浪费。</p>
            </div>
          </li>
        </ul>
        <div className="more-activity">
          更多活动，敬请期待.....
        </div>
      </div>
    );
  }
}
