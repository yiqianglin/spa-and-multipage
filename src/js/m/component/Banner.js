/**
 * Created by cc on 2017/11/1.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactSwipe from 'react-swipe';
import 'css/m/banner.scss';

@inject((stores) => {
  const props = {
    bannerList: stores.systemStore.bannerList.toJS(),
    getBannerList: stores.systemStore.getBannerList.bind(stores.systemStore),
  };
  return props;
}) @observer
class Banner extends Component {
  componentDidMount() {
    this.props.getBannerList(10);
  }
  componentDidUpdate(prevProps, prevState) {
    window.dispatchEvent(new Event('resize'));
  }
  constructor() {
    super();
    this.state = {
      indexShow: 0,
    };
  }
  render() {
    const { bannerList } = this.props;
    console.log('render bannerList', bannerList);
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
              console.log(item.imageUrl);
              return (
                <a className="banner-link" key={index} href={item.url}>
                  <img className="banner-img" src={item.imageUrl} alt=""/>
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
