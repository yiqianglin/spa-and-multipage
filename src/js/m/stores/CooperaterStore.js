import { observable, action, computed } from 'mobx';
import { request } from 'js/m/utils/utilsFunc';
import systemStore from './SystemStore';

class CooperaterStore {
  @computed get productTypeName() {
    const productTypeList = this.dataList && this.dataList.get('productTypeList').toJS();
    const productTypeSelected = this.dataList && this.dataList.get('productTypeSelected');
    if (productTypeList && productTypeList.length && productTypeSelected !== null) {
      const temp = productTypeList.filter((result) => {
        return Number(result.productTypeId) === productTypeSelected;
      });
      if (temp.length > 0) {
        return temp[0].name;
      }
      return null;
    }
    return null;
  }
  constructor() {
    this.dataList = observable.map({
      productTypeList: [], // 一级分类列表
      productTypeDeatilList: [], // 二级分类列表
      cooperaterList: [], // 合作商列表
      productTypeSelected: null, // 一级分类选择(id)
      productTypeDeatilSelected: null, // 二级分类选择(id)
      recommendList: [] // 首页推荐合作商
    });
  }

  /**
   * 获取一级分类列表
   * @example
   * getProductType()
   */
  async getProductType() {
    const params = {};
    const data = await request('/cashloanmarket-web-site/cashloanmarket/productType.htm', params);
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
    this.dataList.set('productTypeSelected', productTypeId);
    const params = { productTypeId };
    const data = await request('/cashloanmarket-web-site/cashloanmarket/productType.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('productTypeDeatilList', list);
      if (!list.length) { // 二级分类为空
        this.getProductList(this.dataList.get('productTypeSelected'));
      } else { // 二级分类不为空，则默认选中第一个，获取产品列表
        this.dataList.set('productTypeDeatilSelected', list[0].productTypeId);
        this.getProductList(this.dataList.get('productTypeSelected'), this.dataList.get('productTypeDeatilSelected'));
      }
    }
  }

  /**
   * 获取推荐列表
   * @example
   * getProductList()
   */
  async getRecommend(productTypeId) {
    const params = { productTypeId };
    const data = await request('/cashloanmarket-web-site/cashloanmarket/productList.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('recommendList', list);
    }
  }

  /**
   * 获取产品列表
   * @example
   * getProductList()
   */
  async getProductList(productTypeId, secondProductTypeId, pageIndex = 1, pageSize = 100) {
    const params = {
      productTypeId,
      pageIndex,
      pageSize
    };
    if (secondProductTypeId) {
      params.secondProductTypeId = secondProductTypeId;
    }
    const data = await request('/cashloanmarket-web-site/cashloanmarket/productList.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.dataList.set('cooperaterList', list);
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
