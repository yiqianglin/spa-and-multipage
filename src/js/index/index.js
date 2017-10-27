import 'css/index/index.scss';
import $ from 'jquery';
import Swiperexpose from 'swiper';
import 'css/lib/swiper/swiper.css';

console.log('pc index', $('.swiper-container'), Swiperexpose);
const mySwiper = new Swiperexpose('.swiper-container', {
  autoplay: 2000, // 可选选项，自动滑动
});
