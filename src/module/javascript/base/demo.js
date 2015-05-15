/**
 * Created by chenlj on 2015/5/14.
 */

/**
 * demo1
 *
 * var f = function(){} 与 function f(){} 类似，在方法体外无法执行
 * */
/**
(function(window){
    a = 2;
    var b = 2;

    gf = function(){
        console.log('global');
    }

    var lf = function(){
        console.log('limit');
    }

    function m(){
        console.debug('limit');
    }
})(window);
gf();
console.debug(a);
console.debug(b);
 */

/**
 * demo2
 *
 * func=function 和 function func()在意义上没有任何不同，但其解释优先级不同：后者会先于同一语句级的其他语句。
 * */
/*
var k = x();
function x(){
    console.log('yes');
}

var kk = xx();
var xx = function(){
    console.log('no');
}*/

/**
 * demo3
 * 理解闭包  闭包就是能够读取其他函数内部变量的函数
 * */

//var name = "The Window";
//var object = {
//    name : "My Object",
//    getNameFunc : function(){
//        return function(){
//            return this.name;
//        };
//    }
//};
//alert(object.getNameFunc()());


//var name = "The Window";
//var object = {
//    name: "My Object",
//    getNameFunc: function () {
//        var that = this;
//        return function () {
//            return that.name;
//        };
//    }
//};
//alert(object.getNameFunc()());
