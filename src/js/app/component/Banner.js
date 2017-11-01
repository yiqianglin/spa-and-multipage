/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactSwipe from 'react-swipe';

import 'css/app/banner.scss';

@inject((stores) => {
  const props = {
  };
  return props;
}) @observer
class Banner extends Component {
  constructor() {
    super();
    this.state = {
      indexShow: 0,
    };
  }
  render() {
    const { productTypeList } = this.props;
    const bannerList = [1, 2, 3];
    return (
      <div className="banner-wrp">
        <ReactSwipe className="swipe-con" swipeOptions={{
          startSlide: 0,
          speed: 400,
          auto: 3000,
          continuous: true,
          transitionEnd: (index, elem) => {
            this.setState({ indexShow: index });
          }
        }}>
          {
            bannerList.map((item, index) => {
              return (
                <a className="banner-link" key={index} href="http://www.baidu.com">
                  <img className="banner-img" src="http://test.xunleiyidai.com/cashloan-web-market/images/banner-01.45edb46d3b281a461314b8b0885bf097.jpg" alt=""/>
                </a>
              );
            })
          }
        </ReactSwipe>
        <div className="page-index-con">
          {
            bannerList.map((item, index) => {
              return (
                ((index) === this.state.indexShow) ? <span key={index} className="dec on"></span> : <span key={index} className="dec off"></span>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Banner;
