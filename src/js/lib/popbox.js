;(function (root, factory) {
    /* global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PopBox = factory();
  }
}(this, function () {
	var PopBox=function(config){
         
        $.extend(true,this,config);
        
        !this.$parent&&(this.$parent=$('body'));
        this.init();
    };
    PopBox.template =
		'<div class="popbox-bg"><div class="pop-box hide">' +
		    '<div class="title"><strong class="pop-box-title"></strong></div>' +
		    '<div class="pop-box-body"></div>' +
		    '<div class="pop-box-ft">' +
		    	'<a href="javascript:;" class="first-btn"></a>' +
		    	'<a href="javascript:;" class="orange second-btn"></a>' +
		    '</div>' +
		'</div></div>';
	PopBox.prototype={
		render: function () {
			var $popBox = $(PopBox.template),
                that=this;
            $popBox.find('.pop-box-title').html(this.title || '');
            $popBox.find('.pop-box-body').html(this.tipmsg || '');
            $popBox.find('a').each(function(index, elem) {
            	 elem.id = that.buttons[index].id;
            	 elem.innerText = that.buttons[index].text;
            });
  			this.$parent.append($popBox);
		},
		bind: function () {
			 var that=this;
			 $('.pop-box-ft').on('click', 'a' , function(e) {
			     var func = that.buttons[$(this).index()].onclick;
			     func && func(e);
			 }); 
		},
		show: function () {
			this.$parent.children('.popbox-bg').addClass('show').children().removeClass('hide');
		},
		hide: function () {
			this.$parent.children('.popbox-bg').removeClass('show').children().addClass('hide');
		},
		destroy: function () {
			this.$parent.children('.popbox-bg').remove();
		},
		setTitle: function (title) {
			this.title = title;
			this.$parent.children('.popbox-bg').find('.pop-box-title').html(this.title || '');
		},
		setMsg: function (msg) {
			this.tipmsg = msg;
			this.$parent.children('.popbox-bg').find('.pop-box-body').html(this.tipmsg || '');
		},
		init: function () {
			this.render(); 
			this.bind();
		}
	};
	return PopBox;
}));