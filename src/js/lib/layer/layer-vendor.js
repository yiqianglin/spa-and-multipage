/**
 * Created by Administrator on 2017/10/31 0031.
 */
import './layer.js';

window.layer = layer;
layer.config({
  path: '/src/js/lib/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});

export default layer;
