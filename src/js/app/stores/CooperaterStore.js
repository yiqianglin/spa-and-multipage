import { observable, action, computed } from 'mobx';
import { request } from 'js/app/utils/utilsFunc';
import systemStore from './SystemStore';

class CooperaterStore {
  constructor() {
    this.dataList = observable.map({
      productTypeList: [], // 一级分类列表
      productTypeDeatilList: [], // 二级分类列表
      cooperaterList: [], // 合作商列表
      productTypeSelected: null, // 一级分类选择
      productTypeDeatilSelected: null, // 二级分类选择
    });
  }

  /**
   * 获取一级分类列表
   * @example
   * getProductType()
   */
  async getProductType() {
    const params = {};
    const data = await request('/cashloan-web-market/cashloanmarket/productType.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('productTypeList', list);
      // 此时自动选择第一个一级分类的，获取二级分类
      this.dataList.set('productTypeSelected', list[0].productTypeId);
      this.getProductTypeDeatil(list[0].productTypeId);
    }
  }

  /**
   * 获取二级分类列表
   * @example
   * getProductType()
   */
  async getProductTypeDeatil(productTypeId) {
    const params = { productTypeId };
    const data = await request('/cashloan-web-market/cashloanmarket/productType.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('productTypeDeatilList', list);
    }
  }

  /**
   * 获取产品列表
   * @example
   * getProductList()
   */
  async getProductList(productTypeId, secondProductTypeId, pageIndex = 1, pageSize = 100) {
    const params = { productTypeId, secondProductTypeId, pageIndex, pageSize };
    const data = await request('/cashloan-web-market/cashloanmarket/productList.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('productTypeDeatilList', list);
    }
  }

  /**
   * 自动获取二级分类列表
   * @example
   * getSmashEggCurrentRoundInfo(previousRoundId)
   */
  @action autoGetProductTypeDetail() {}
}

const cooperaterStore = new CooperaterStore();

/** GameStore实例 */
export default cooperaterStore;
export { CooperaterStore };
