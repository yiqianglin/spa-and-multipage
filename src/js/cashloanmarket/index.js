import 'css/cashloanmarket/index.scss';
import { post } from 'js/utils/request';
// import { template } from 'js/lib/template-web';
import { checkIEVersonr } from 'js/utils/utilsFunc';

require('es6-promise').polyfill();
// require('core-js/fn/promise');

const bannerTmp = require('component/cashloanmarket/banner.art');
const selectItemUlTmp = require('component/cashloanmarket/select-item-ul.art');
const tabContainerTmp = require('component/cashloanmarket/tab-container.art');
const runtime = require('art-template/lib/runtime');

runtime.countFormat = (baseNum) => {
  let _baseNum = 0;
  if (baseNum) {
    _baseNum = baseNum;
  }
  const timestampDifference = new Date().getTime() - new Date(2017, 10, 7, 0, 0, 0).getTime();
  return _baseNum + Math.floor(timestampDifference / 1000 / 60 / 5);
};

$(document).ready(() => {
  const manager = {
    globalData: {
      bannerList: [],
      productTypeList: [], // 一级类目返回数据
      productList: [], // 商户列表
    },
    renderSwiper(tmp, dom) {
      const html = tmp({
        bannerList: manager.globalData.bannerList
      });
      dom.html(html);
      const mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000, // 可选选项，自动滑动
        loop: true,
        pagination: '.pagination',
        paginationClickable: true
      });
    },
    getBanner() {
      return post(`${contentPath}/cashloanmarket/getBanner.htm`, { appType: 10 })
        .then((response) => {
          console.log('banner', response);
          manager.globalData.bannerList = response.data.data.list;
          return Promise.resolve(response);
        });
    },
    getProductType_1() { // 一级类
      return post(`${contentPath}/cashloanmarket/productType.htm`)
        .then((response) => {
          console.log(1, response);
          manager.globalData.productTypeList = response.data.data.list;
          manager.renderSelectItemUlTmp(selectItemUlTmp, $('#select-item-ul'));
          return Promise.resolve(response);
        });
    },
    getProductList(params) {
      return post(`${contentPath}/cashloanmarket/productList.htm`, params)
        .then((response) => {
          console.log(3, response);
          manager.globalData.productList = response.data.data.list;
          manager.renderTabContainerTmp(tabContainerTmp, $('#tab-container'));
          return Promise.resolve(response);
        });
    },
    report(params) {
      return post(`${contentPath}/stat/clickproduct.htm`, params)
        .then((response) => {
          return Promise.resolve(response);
        });
    },
    renderSelectItemUlTmp(tmp, dom) {
      const html = tmp({
        productTypeList: manager.globalData.productTypeList, // 一级类目返回数据
      });
      dom.html(html);
    },
    renderTabContainerTmp(tmp, dom) {
      const html = tmp({
        typeName: '热门推荐', // 推荐类目返回数据
        productList: manager.globalData.productList, // 商户列表,
        contentPath
      });
      dom.html(html);
    },
    showPop(options, url) {
      manager.createQRcode(url);
      layer.open({
        type: 1,
        closeBtn: 0, // 取消关闭按钮
        shade: [0.8, '#000'], // 背景颜色和透明度
        scrollbar: true, // 禁止下拉框
        title: false, // 不显示标题
        area: options.area,
        content: options.content
      });
      $('.layui-layer').css({ 'background-color': 'transparent' });

      $('.close-btn').bind('click', (e) => {
        layer.closeAll();
      });
      $('.layui-layer-shade').bind('click', (e) => {
        layer.closeAll();
      });
    },
    createQRcode(url) {
      $('#QRcode-canvas').empty();
      $('#QRcode-canvas').qrcode({
        render: checkIEVersonr(8) ? 'table' : 'canvas', // 渲染方式有table方式和canvas方式
        width: 180, // 宽度
        height: 180, // 高度
        text: url
      });
    },
    eventBind() {
      $('.strategy').hover(() => {
        $('.strategy-content').addClass('show');
      }, () => {
        $('.strategy-content').removeClass('show');
      });
      // 一级类选择
      $('body').on('click', '.select-item-li', function () {
        window.location.href = `${contentPath}/cashloanmarket/more.htm?productTypeId=${$(this).attr('data-productTypeId')}`;
      });
      $('body').on('click', '.go-cooperater-btn', function () {
        const url = $(this).attr('data-url');
        const mobileurl = $(this).attr('data-mobileurl');
        const name = $(this).attr('data-name');
        const productId = $(this).attr('data-productid');
        manager.report({ productId })
          .catch((err) => {
            console.log('上报统计错误');
          });
        if (url) {
          window.location.href = url;
        }
        if (mobileurl) {
          $('#cooperater-name').html(name);
          manager.showPop({ area: [], content: $('#pop-wrp') }, mobileurl);
        }
      });
    },
    init() {
      manager.getBanner()
        .then(() => {
          manager.renderSwiper(bannerTmp, $('#banner-container-wrp'));
        })
        .catch((err) => {
          console.log('index.js catch 的getBanner错误 2');
        });
      manager.getProductType_1()
        .catch((err) => {
          console.log('index.js catch 的getProductType_1错误 2');
        });
      manager.getProductList({ productTypeId: 999999 })
        .catch((err) => {
          console.log('index.js catch 的getProductList错误 2');
        });
      manager.eventBind();
    }
  };
  manager.init();
});
