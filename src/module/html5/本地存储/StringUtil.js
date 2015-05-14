/**
 * Created by chenlj on 2015/5/13.
 */
//去除字符串中间空格
String.prototype.Trim = function() {

    return this.replace(/(^s*)|(s*$)/g,"");
}
//去除字符串左侧空格
String.prototype.LTrim = function() {

    return this.replace(/(^s*)/g,"");
}
//去除字符串右侧空格
String.prototype.RTrim = function() {

    return this.replace(/(s*$)/g,"");
}
//去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
function Trim(str,is_global){

    var result;

    result = str.replace(/(^s+)|(s+$)/g,"");

    if(is_global.toLowerCase()=="g")

        result = result.replace(/s/g,"");

    return result;
}