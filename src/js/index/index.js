import Swiperexpose from 'swiper';
import 'css/lib/swiper/swiper.css';
import 'css/index/index.scss';
import { post } from 'js/utils/request';
import { template } from 'js/lib/template-web';
import { checkIEVersonr } from 'js/utils/utilsFunc';

const selectItemUlTmp = require('component/index/select-item-ul.art');
const selectDetailItemWrpTmp = require('component/index/select-detail-item-wrp.art');
const tabContainerTmp = require('component/index/tab-container.art');

$(document).ready(() => {
  const manager = {
    globalData: {
      productTypeIdSelected: null, // 一级类目选择id
      productDetailTypeSelected: null, // 二级类目选择id
      productTypeList: [], // 一级类目返回数据
      productDetailTypeList: [], // 二级类目返回数据
      productList: [], // 商户列表
    },
    renderSwiper() {
      const mySwiper = new Swiperexpose('.swiper-container', {
        autoplay: 2000, // 可选选项，自动滑动
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender(swiper, index, className) {
          return `<span class="${className}"></span>`;
        }
      });
    },
    getProductType_1() { // 一级类
      return post('/cashloan-web-market/cashloanmarket/productType.htm')
        .then((response) => {
          console.log(1, response);
          manager.globalData.productTypeList = response.data.data.list;
          manager.globalData.productTypeIdSelected = manager.globalData.productTypeList[0].productTypeId; // 初始默认第一项一级分类被选中
          manager.renderSelectedContainer(selectItemUlTmp, $('#select-item-ul'));
          return Promise.resolve(response);
        });
    },
    getProductType_2(productTypeId) { // 一级类获取二级类
      return post('/cashloan-web-market/cashloanmarket/productType.htm', productTypeId)
        .then((response) => {
          console.log(2, response);
          manager.globalData.productDetailTypeList = response.data.data.list;
          manager.renderSelectedContainer(selectDetailItemWrpTmp, $('#select-detail-item-wrp'));
          return Promise.resolve(response);
        });
    },
    getProductList(productTypeId) {
      return post('/cashloan-web-market/cashloanmarket/productList.htm', productTypeId)
        .then((response) => {
          console.log(3, response);
          manager.globalData.productList = response.data.data.list;
          manager.renderSelectedContainer(tabContainerTmp, $('#tab-container'));
          return Promise.resolve(response);
        });
    },
    renderSelectedContainer(tmp, dom) {
      console.log(manager.globalData.productTypeIdSelected);
      const html = tmp({
        productTypeIdSelected: manager.globalData.productTypeIdSelected, // 一级类目选择id
        productDetailTypeSelected: manager.globalData.productDetailTypeSelected, // 二级类目选择id
        productTypeList: manager.globalData.productTypeList, // 一级类目返回数据
        productDetailTypeList: manager.globalData.productDetailTypeList, // 二级类目返回数据
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
      $('body').on('click', '.select-item-li', function () {
        if ($(this).attr('data-productTypeId') === manager.globalData.productTypeIdSelected) { // 如果点击还是同一类目
          return;
        }
        manager.globalData.productTypeIdSelected = $(this).attr('data-productTypeId');
        if ($(this).attr('data-hasSubType')) { // 有二级分类
          console.log(manager.globalData.productTypeIdSelected);
          manager.globalData.productDetailTypeSelected = null; // 重置
          manager.getProductType_2({ productTypeId: manager.globalData.productTypeIdSelected })
            .then((response) => {
              if (response.data.data.list && response.data.data.list.length) {
                console.log('返回的数据包含合作商');
                manager.globalData.productDetailTypeSelected = manager.globalData.productDetailTypeList[0].productTypeId;
                manager.getProductList({
                  productTypeId: manager.globalData.productTypeIdSelected, secondProductTypeId: manager.globalData.productDetailTypeSelected, pageIndex: 1, pageSize: 100
                });
              } else {
                manager.getProductList({
                  productTypeId: manager.globalData.productTypeIdSelected, pageIndex: 1, pageSize: 100
                });
              }
            });
        } else { // 没有二级分类
          console.log('没有二级分类');
          manager.getProductList({ productTypeId: manager.globalData.productTypeIdSelected, pageIndex: 1, pageSize: 100 });
        }
      });
      // 二级类选择
      $('body').on('click', '.select-detail-item-li', function () {
        console.log($(this).attr('data-productTypeId'));
        if ($(this).attr('data-productTypeId') === manager.globalData.productDetailTypeSelected) {
          return;
        }
        manager.globalData.productDetailTypeSelected = $(this).attr('data-productTypeId');
        manager.getProductList({
          productTypeId: manager.globalData.productTypeIdSelected, secondProductTypeId: manager.globalData.productDetailTypeSelected, pageIndex: 1, pageSize: 100
        });
      });
      $('body').on('click', '.go-cooperater-btn', function () {
        console.log($(this).attr('data-url'));
        manager.showPop({ area: [], content: $('#pop-wrp') }, $(this).attr('data-url'));
      });
    },
    init() {
      manager.renderSwiper();
      manager.getProductType_1()
        .then(() => {
          if (!manager.globalData.productTypeList[0].hasSubType) { // 没有二级分类
            manager.getProductList({ productTypeId: manager.globalData.productTypeIdSelected, pageIndex: 1, pageSize: 100 });
          }
        });
      manager.eventBind();
      // manager.showPop({ area: [], content: $('#pop-wrp') }, 'http://www.baidu.com');
      // layer.msg('开始都金风科技阿克苏福建省打飞机');
    }
  };
  manager.init();
});
