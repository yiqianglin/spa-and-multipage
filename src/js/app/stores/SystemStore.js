import { observable, action } from 'mobx';
import { request } from 'js/app/utils/utilsFunc';

class SystemStore {
  /**
   * 弹窗名及显示隐藏状态集合
   * @type {ObservableMap}
   */
  @observable popStatus;
  /**
   * banner
   * @type {Array}
   */
  @observable bannerList;

  constructor() {
    this.popStatus = observable.map({
      isShowTypeSelectPanel: false
    });
    this.bannerList = [];
  }
  /**
   * 设置弹窗状态
   * @example
   * togglePop('isShowSimuIntro',true)
   *
   * @param {string} popName 弹窗名
   * @param {boolean} isShow 弹窗状态
   */
  @action
  togglePop(popName, isShow) {
    this.popStatus.set(popName, isShow);
  }

  /**
   * 获取一级分类列表
   * @example
   * getProductType()
   */
  async getBannerList(appType) {
    const params = { appType };
    console.log('banner request');
    const data = await request('/cashloan-web-market/cashloanmarket/getBanner.htm', params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.bannerList = list;
    }
  }
}

const systemStore = new SystemStore();

/** SystemStore实例 */
export default systemStore;
export { SystemStore };
