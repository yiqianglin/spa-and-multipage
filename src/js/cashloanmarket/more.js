// import $ from 'jquery';  expose出来，可用，但是会打包进js
import 'css/cashloanmarket/more.scss';
import { post } from 'js/utils/request';
// import { template } from 'js/lib/template-web';
import { checkIEVersonr, toQueryParams } from 'js/utils/utilsFunc';

const selectItemUlTmp = require('component/cashloanmarket/select-item-ul.art');
const selectDetailItemWrpTmp = require('component/cashloanmarket/select-detail-item-wrp.art');
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
      productTypeIdSelected: null, // 一级类目选择id
      productDetailTypeSelected: null, // 二级类目选择id
      productTypeList: [], // 一级类目返回数据
      productDetailTypeList: [], // 二级类目返回数据
      productList: [], // 商户列表,
      typeName: null, // 一级类目标题
      notCarryFlag: null, // 用于表示（用二级类获取产品时，是否需要携带一级分类）
    },
    getProductType_1() { // 一级类
      return post(`${contentPath}/cashloanmarket/productType.htm`)
        .then((response) => {
          console.log(1, response);
          manager.globalData.productTypeList = response.data.data.list;
          manager.renderSelectedContainer(selectItemUlTmp, $('#select-item-ul'));
          return Promise.resolve(response);
        });
    },
    getProductType_2(productTypeId) { // 一级类获取二级类
      return post(`${contentPath}/cashloanmarket/productType.htm`, productTypeId)
        .then((response) => {
          console.log(2, response);
          manager.globalData.productDetailTypeList = response.data.data.list;
          manager.renderSelectedContainer(selectDetailItemWrpTmp, $('#select-detail-item-wrp'));
          return Promise.resolve(response);
        });
    },
    getProductListAll() {
      const reqParams = {
        pageIndex: 1, pageSize: 100
      };
      return post(`${contentPath}/cashloanmarket/productList.htm`, reqParams)
        .then((response) => {
          console.log(3, response);
          manager.globalData.productList = response.data.data.list;
          manager.renderSelectedContainer(tabContainerTmp, $('#tab-container'));
          return Promise.resolve(response);
        });
    },
    getProductList() {
      const reqParams = {
        pageIndex: 1, pageSize: 100
      };
      const typeSelected = manager.globalData.productTypeList.filter((result) => {
        return Number(result.productTypeId) === Number(manager.globalData.productTypeIdSelected);
      })[0];
      const detailTypeSelected = manager.globalData.productDetailTypeList.filter((result) => {
        return Number(result.productTypeId) === Number(manager.globalData.productDetailTypeSelected);
      })[0];
      if (typeSelected.notCarryFlag) {
        console.log('1!!!!!!!');
        reqParams.secondProductTypeId = manager.globalData.productDetailTypeSelected;
      }
      if (!typeSelected.notCarryFlag && typeSelected.hasSubType) {
        console.log('2~~~~~~~~~~~~~');
        reqParams.productTypeId = manager.globalData.productTypeIdSelected;
        reqParams.secondProductTypeId = manager.globalData.productDetailTypeSelected;
      } else if (!typeSelected.notCarryFlag && !typeSelected.hasSubType) {
        console.log('3~~~~~~~~~~~~~', typeSelected.notCarryFlag, typeSelected.hasSubType);
        reqParams.productTypeId = manager.globalData.productTypeIdSelected;
      }
      return post(`${contentPath}/cashloanmarket/productList.htm`, reqParams)
        .then((response) => {
          console.log(3, response);
          manager.globalData.productList = response.data.data.list;
          manager.renderSelectedContainer(tabContainerTmp, $('#tab-container'));
          return Promise.resolve(response);
        });
    },
    report(params) {
      return post(`${contentPath}/stat/clickproduct.htm`, params)
        .then((response) => {
          return Promise.resolve(response);
        });
    },
    renderSelectedContainer(tmp, dom) {
      const html = tmp({
        productTypeIdSelected: manager.globalData.productTypeIdSelected, // 一级类目选择id
        productDetailTypeSelected: manager.globalData.productDetailTypeSelected, // 二级类目选择id
        productTypeList: manager.globalData.productTypeList, // 一级类目返回数据
        productDetailTypeList: manager.globalData.productDetailTypeList, // 二级类目返回数据
        productList: manager.globalData.productList, // 商户列表
        typeName: manager.globalData.typeName // 一级类目标题
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
        if ($(this).attr('data-productTypeId') === manager.globalData.productTypeIdSelected) { // 如果点击还是同一类目
          return;
        }
        manager.globalData.productTypeIdSelected = $(this).attr('data-productTypeId');
        manager.globalData.typeName = $(this).attr('data-typeName');
        manager.globalData.notCarryFlag = $(this).attr('data-notCarryFlag');
        manager.renderSelectedContainer(selectItemUlTmp, $('#select-item-ul'));
        if (Number($(this).attr('data-hasSubType')) === 1) { // 有二级分类
          console.log('有二级分类');
          manager.globalData.productDetailTypeSelected = null; // 重置
          manager.getProductType_2({ productTypeId: manager.globalData.productTypeIdSelected })
            .then((response) => {
              if (response.data.data.list && response.data.data.list.length) {
                manager.globalData.productDetailTypeSelected = manager.globalData.productDetailTypeList[0].productTypeId;
                manager.renderSelectedContainer(selectDetailItemWrpTmp, $('#select-detail-item-wrp'));
                manager.getProductList();
              } else {
                manager.getProductList();
              }
            });
        } else { // 没有二级分类
          console.log('没有二级分类');
          manager.getProductList();
        }
      });
      // 二级类选择
      $('body').on('click', '.select-detail-item-li', function () {
        if ($(this).attr('data-productTypeId') === manager.globalData.productDetailTypeSelected) {
          return;
        }
        manager.globalData.productDetailTypeSelected = $(this).attr('data-productTypeId');
        manager.renderSelectedContainer(selectDetailItemWrpTmp, $('#select-detail-item-wrp'));
        manager.getProductList();
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
      manager.getProductType_1()
        .then(() => {
          // 判断url上是否有参数
          const urlProductTypeId = toQueryParams(window.location.search).productTypeId; // url上的productTypeId
          if (urlProductTypeId) {
            const temp = manager.globalData.productTypeList.filter((result) => {
              return Number(result.productTypeId) === Number(urlProductTypeId);
            });
            if (temp.length) {
              // 如果有匹配，则选中匹配url的一级分类
              manager.globalData.productTypeIdSelected = urlProductTypeId;
              manager.globalData.typeName = temp[0].name;
              manager.globalData.notCarryFlag = temp[0].notCarryFlag;
            } else {
              // 如果没有匹配，则默认显示全部
              manager.globalData.typeName = '全部';
              manager.globalData.productTypeIdSelected = null;
              manager.getProductListAll();
              manager.renderSelectedContainer(selectItemUlTmp, $('#select-item-ul'));
              return;
            }
          } else { // url上没有参数
            manager.globalData.productTypeIdSelected = manager.globalData.productTypeList[0].productTypeId; // 初始默认第一项一级分类被选中
            manager.globalData.typeName = manager.globalData.productTypeList[0].name;
            manager.globalData.notCarryFlag = manager.globalData.productTypeList[0].notCarryFlag;
          }
          manager.renderSelectedContainer(selectItemUlTmp, $('#select-item-ul'));

          // 判断选中的一级目录下是否有二级目录
          let hasSubTypeJudgement = false;
          const temp = manager.globalData.productTypeList.filter((result) => {
            return Number(result.productTypeId) === Number(manager.globalData.productTypeIdSelected);
          });
          if (temp.length) {
            hasSubTypeJudgement = temp[0].hasSubType;
          }
          if (!hasSubTypeJudgement) { // 没有二级分类
            console.log('init 没有二级分类');
            manager.getProductList();
          } else {
            manager.getProductType_2({ productTypeId: manager.globalData.productTypeIdSelected })
              .then((response) => {
                if (response.data.data.list && response.data.data.list.length) {
                  manager.globalData.productDetailTypeSelected = manager.globalData.productDetailTypeList[0].productTypeId; // 默认选中二级分类第一个
                  manager.renderSelectedContainer(selectDetailItemWrpTmp, $('#select-detail-item-wrp'));
                  manager.getProductList();
                } else {
                  manager.getProductList();
                }
              });
          }
        });
      manager.eventBind();
    }
  };
  manager.init();
});
