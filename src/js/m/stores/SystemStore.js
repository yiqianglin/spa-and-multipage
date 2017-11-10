import { observable, action } from 'mobx';
import { request } from 'js/m/utils/utilsFunc';

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
   * 获取banner列表
   * @example
   * getProductType()
   */
  async getBannerList(appType) {
    const params = { appType };
    const data = await request(`${contentPath}/cashloanmarket/getBanner.htm`, params);
    if (+data.status === 1) {
      const { list } = data.data;
      this.bannerList = list;
    }
  }

  /**
   * 点击上报
   * @example
   * clickProductReport()
   */
  async clickProductReport(productId) {
    const params = { productId };
    const data = await request(`${contentPath}/stat/clickproduct.htm`, params);
  }
}

const systemStore = new SystemStore();

/** SystemStore实例 */
export default systemStore;
export { SystemStore };
