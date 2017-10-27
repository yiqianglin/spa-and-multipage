$(function() {

/*验证手机号码*/
jQuery.validator.addMethod("isMobile", function(value, element) {   
    var tel = /^1[3|4|5|7|8][0-9]{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确格式的手机号码");

jQuery.validator.addMethod("isEmailOrMobile", function(value, element) {   
    var tel = /^^1[3|4|5|7|8][0-9]{9}$/;
    var mail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return this.optional(element) || (tel.test(value)) || (mail.test(value));
}, "请输入正确格式的手机号码或邮箱");
/*验证身份证号*/
jQuery.validator.addMethod("isIdNumber", function(value, element) {   
    var tel = /^[0-9]{17}[0-9|x|X]$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确格式的身份证号码");
jQuery.validator.addMethod("isPassword", function(value, element) {   
    var tel = /^(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-z0-9]*$/i;
    return this.optional(element) || (tel.test(value));
}, "密码必须由字母和数字组成");
jQuery.validator.addMethod("isBankcardNO", function(value, element) {
	value = value.replace(/ /g,"");
    var tel = /^\d{16}|\d{19}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的银行卡号码");
});