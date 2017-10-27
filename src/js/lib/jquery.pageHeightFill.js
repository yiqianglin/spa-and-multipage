var fullPageGenerator = {
  $targetDom: null,
  $clientWidth: 0,
  $clientHeight: 0,
  pageHeight: 0,
  paddingHeight: 0,
  otherDom: [],
  otherDomTotalHeight: 0,
  judgePageSize: function() {
    fullPageGenerator.pageHeight = document.body.scrollHeight;
    // console.log(fullPageGenerator.pageHeight, fullPageGenerator.$clientHeight, fullPageGenerator.pageHeight <= fullPageGenerator.$clientHeight ? 'resizeDom' : '不用resize');
    if (fullPageGenerator.pageHeight <= fullPageGenerator.$clientHeight) {
      fullPageGenerator.resizeDom();
    }
  },
  findDimensions: function() {
    //获取窗口宽度
    if (window.innerWidth) fullPageGenerator.$clientWidth = window.innerWidth;
    else if (document.body && document.body.clientWidth)
      fullPageGenerator.$clientWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
      fullPageGenerator.$clientHeight = window.innerHeight;
    else if (document.body && document.body.clientHeight)
      fullPageGenerator.$clientHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      fullPageGenerator.$clientHeight = document.documentElement.clientHeight;
      fullPageGenerator.$clientWidth = document.documentElement.clientWidth;
    }
  },

  resizeDom: function() {
    fullPageGenerator.$targetDom.height(
      fullPageGenerator.$clientHeight -
        fullPageGenerator.otherDomTotalHeight -
        fullPageGenerator.paddingHeight
    );
  },

  onresize: function() {
    fullPageGenerator.findDimensions();
    fullPageGenerator.judgePageSize();
  },

  init: function(dom, otherDom, padding) {
    // dom [dom...]
    if (padding) {
      fullPageGenerator.paddingHeight = padding;
    }
    fullPageGenerator.$targetDom = dom;
    fullPageGenerator.$otherDom = otherDom;
    for (var i = 0; i < otherDom.length; i++) {
      fullPageGenerator.otherDomTotalHeight += otherDom[i].outerHeight();
    }
    // console.log(fullPageGenerator.otherDomTotalHeight);
    fullPageGenerator.onresize();
    window.onresize = fullPageGenerator.onresize;
  }
};
