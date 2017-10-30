import $ from 'jquery';
import Swiperexpose from 'swiper';
import 'css/lib/swiper/swiper.css';
import 'css/index/index.scss';
import { post } from 'js/utils/request';
// import { template } from 'art-template';
import { template } from 'js/lib/template-web';

const indexTmp = require('component/index/select-container.art');

$(document).ready(() => {
  const mySwiper = new Swiperexpose('.swiper-container', {
    autoplay: 2000, // 可选选项，自动滑动
    pagination: '.swiper-pagination',
    paginationClickable: true,
    paginationBulletRender(swiper, index, className) {
      return `<span class="${className}"></span>`;
    }
  });
  post('/cashloan-web-market/cashloanmarket/productType.htm', null)
    .then((response) => {
      console.log(response.data.data, indexTmp);
      const html = indexTmp({
        nicname: 'henix',
        friendList: ['kuler', '111', '222'],
        selectItemList: response.data.data.list
      });
      console.log(html);
      $('#select-container-wrp').html(html);
    });
});

