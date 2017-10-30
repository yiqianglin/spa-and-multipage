import $ from 'jquery';
import 'css/index/index.scss';
import { post } from 'js/utils/request';
import { template } from 'js/lib/template-web';
import layer from 'js/lib/layer/layer-vendor';

// layer.config({
//   path: 'js/lib/layer/' // layer.js所在的目录，可以是绝对目录，也可以是相对目录
// });
console.log(layer.config);
layer.msg('如若');

const indexTmp = require('component/index/select-container.art');

$(document).ready(() => {
  const manager = {
    globalData: {
      simuData: [
        {
          productTypeId: 1,
          detailItem: ['不限', '500-1000元', '1000-2000元', '2000-5000元', '5000-10000元']
        },
        {
          productTypeId: 2,
          detailItem: ['不限', '2000-5000元', '5000-10000元']
        },
        {
          productTypeId: 3,
          detailItem: ['不限', '2000-5000元', '5000-10000元', '10000-2000元', '2万元以上']
        }
      ],
      productTypeIdSelected: 2,
      productDetailTypeSelected: null,
      productTypeList: [],
    },
    getProductType() {
      console.log('get111');
      post('/cashloan-web-market/cashloanmarket/productType.htm', null)
        .then((response) => {
          manager.globalData.productTypeList = response.data.data.list;
          manager.renderSelectedContainer();
        });
    },
    renderSelectedContainer() {
      const html = indexTmp({
        selectItemList: manager.globalData.productTypeList,
        detailItem: manager.globalData.simuData[manager.globalData.productTypeIdSelected - 1].detailItem,
        productTypeIdSelected: manager.globalData.productTypeIdSelected,
        productDetailTypeSelected: manager.globalData.productDetailTypeSelected,
      });
      $('#select-container-wrp').html(html);
    },
    eventBind() {
      $('body').on('click', '.select-item-li', function () {
        manager.globalData.productTypeIdSelected = $(this).index() + 1;
        console.log(manager.globalData.productTypeIdSelected);
        manager.globalData.productDetailTypeSelected = 1; // 重置
        manager.globalData.detailItem = manager.globalData.simuData[manager.globalData.productTypeIdSelected - 1].detailItem;
        manager.renderSelectedContainer();
      });
    }
  };
  manager.getProductType();
  manager.eventBind();
});

