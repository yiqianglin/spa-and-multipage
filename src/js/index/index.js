import 'css/index/index.scss';
import { post } from 'js/utils/request';
// import { template } from 'js/lib/template-web';
import { checkIEVersonr } from 'js/utils/utilsFunc';

const bannerTmp = require('component/index/banner.art');
const selectItemUlTmp = require('component/index/select-item-ul.art');
const tabContainerTmp = require('component/index/tab-container.art');

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
        autoplay: 2000, // 可选选项，自动滑动
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender(swiper, index, className) {
          return `<span class="${className}"></span>`;
        }
      });
    },
    getBanner() {
      return post('/cashloan-web-market/cashloanmarket/getBanner.htm', { appType: 10 })
        .then((response) => {
          console.log('banner', response);
          manager.globalData.bannerList = response.data.data.list;
          return Promise.resolve(response);
        });
    },
    getProductType_1() { // 一级类
      return post('/cashloan-web-market/cashloanmarket/productType.htm')
        .then((response) => {
          console.log(1, response);
          manager.globalData.productTypeList = response.data.data.list;
          manager.renderSelectItemUlTmp(selectItemUlTmp, $('#select-item-ul'));
          return Promise.resolve(response);
        });
    },
    getProductList(params) {
      return post('/cashloan-web-market/cashloanmarket/productList.htm', params)
        .then((response) => {
          console.log(3, response);
          manager.globalData.productList = response.data.data.list;
          manager.renderTabContainerTmp(tabContainerTmp, $('#tab-container'));
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
        typeName: '极速贷款', // 推荐类目返回数据
        productList: manager.globalData.productList // 商户列表
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
      // 一级类选择
      $('body').on('click', '.select-item-li', () => {
        window.location.href = '/cashloan-web-market/index/more.html';
      });
      $('body').on('click', '.go-cooperater-btn', function () {
        const mobileurl = $(this).attr('data-mobileurl');
        const name = $(this).attr('data-name');
        if (mobileurl) {
          setTimeout(() => {
            $('#cooperater-name').html(name);
            manager.showPop({ area: [], content: $('#pop-wrp') }, mobileurl);
          }, 300);
        }
      });
    },
    init() {
      manager.getBanner()
        .then(() => {
          manager.renderSwiper(bannerTmp, $('#banner-container-wrp'));
        });
      manager.getProductType_1();
      manager.getProductList({ productTypeId: 999999 });
      manager.eventBind();
      // layer.msg('测试');
    }
  };
  manager.init();
});
