import { observable, action } from 'mobx';

class SystemStore {
  /**
   * 弹窗名及显示隐藏状态集合
   * @type {ObservableMap}
   */
  @observable popStatus;

  constructor() {
    this.popStatus = observable.map({
      isShowGameRule: false,
      isShowShare: false,
      isShowSmashResult: false,
      isShowSmashLevelResult: false
    });
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
}

const systemStore = new SystemStore();

/** SystemStore实例 */
export default systemStore;
export { SystemStore };
