/**
 * Created by chenlj on 2015/5/14.
 */

/**
 * demo1
 *
 * var f = function(){} 与 function f(){} 类似，在方法体外无法执行
 * */
var demo1 = function(){
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
}
//demo1();

/**
 * demo2
 *
 * func=function 和 function func()在意义上没有任何不同，但其解释优先级不同：后者会先于同一语句级的其他语句。
 * */
var demo2 = function(){
    var k = x();
    function x(){
        console.log('yes');
    }

    var kk = xx();
    var xx = function() {
        console.log('no');
    }
}

//demo2();

/**
 * demo3
 * 理解闭包  闭包就是能够读取其他函数内部变量的函数
 * */
var demo3_1 = function(){
    var name = "The Window";
    var object = {
        name : "My Object",
        getNameFunc : function(){
            return function(){
                return this.name;
            };
        }
    };
    alert(object.getNameFunc()());
}
//demo3_1();


var demo3_2 = function(){
    var name = "The Window";
    var object = {
        name: "My Object",
        getNameFunc: function () {
            var that = this;
            return function () {
                return that.name;
            };
        }
    };
    alert(object.getNameFunc()());
}
//demo3_2();


/**
 * demo4
 * 理解apply call   caller  callee
 * */
//call 与 apply 的不同之处在于传参方式不同,apply以数组的形式传递

var demo4_1 = function(){
    var obj1 = {
        name : '小明',
        say : function(){
            console.debug(this.name);
        },
        run : function(who){
            console.debug(who + 'run');
        }
    };

    var obj2 = {name : '小红'};
    obj1.say();
    obj1.say.call(obj2);

    obj1.run('小明');
    obj1.run.call(obj2,'小红');
    obj1.run.apply(obj2,['小红']);
}
//demo4_1();

var demo4_2 = function(){
    var fun1 = function () {
        var fun2 = function () {
            console.debug(fun2.caller);
            console.debug(fun1 instanceof Function);
            console.debug(fun1 == fun2.caller);

            console.debug(fun1.caller);
        }
        fun2();
    }
    fun1();
}
//demo4_2();

var demo4_3 = function(){
    (function () {
        console.debug(arguments.callee);
    })();
}
//demo4_3();


/**
 * demo5 Function
 * */
var demo5 = function(){
    function Dog (){
        this.name = '金毛';
        this.say = function(){
            console.debug(this.name + this.age);
        }
    }

    var dog = function(){
        this.name = '小金毛';
        this.say = function(){
            console.debug(this.name);
        }
    }

    var Dog1 = new Dog();
    Dog1.say();
    new dog().say();
    Dog.prototype.age = 20;
    Dog1.say();

}

//demo5();

/**
 * demo6 原型陷阱
 * */

var demo6 = function(){
    function Dog(){
        this.tail = true;
    }
    var benji = new Dog();
    var rusty = new Dog();

    Dog.prototype.say = function(){
        return 'Woof!';
    }

    benji.say();
    rusty.say();
    console.log('constructor:%o',Dog.constructor);
    console.log('benji:%o',benji.constructor);
    console.log('rusty:%o',rusty.constructor);

    console.log('替换prototype前:%o',benji);

    Dog.prototype = {paws:4,hair:true};
    Dog.prototype.constructor = Dog;

    console.log(benji.tail);
    benji.say();
    console.debug('benji:%o',benji);

    var tt = new Dog();
    //tt.say()
    console.log('paws:' + tt.paws);
    console.log(tt);

    //当我们重写某对象的prototype时,重置相应的contructor属性是一个好习惯
}
//demo6();

/**
 * demo7 原型链继承
 * */
var demo7 = function(){
    function Shape(){
        this.name = 'shape';
        this.toString = function(){
            return this.name;
        }
    }

    function TwoDShape(){
        this.name = '2D shape';
    }

    function Triangle(side,height){
        this.name = 'Triangle';
        this.side = side;
        this.height = height;
        this.getArea = function(){
            return this.side * this.height/2;
        }
    }

    TwoDShape.prototype = new Shape();
    Triangle.prototype = new TwoDShape();

    var s1 = new Shape();
    console.log(s1);

    var s2 = new TwoDShape();
    console.log(s2);

    var s3 = new Triangle();
    console.log(s3);

    console.log(s1 instanceof  Shape);
    console.log(s2 instanceof  TwoDShape);
    console.log(s3 instanceof  Triangle);

    console.log(s1.constructor);
    console.log(s2.constructor);
    console.log(s3.constructor);

    console.log('==============');
    TwoDShape.prototype.constructor = TwoDShape;
    Triangle.prototype.constructor = Triangle;
    console.log(s1);
    console.log(s2);
    console.log(s3);
    console.log(s1.constructor);
    console.log(s2.constructor);
    console.log(s3.constructor);
}
//demo7();

/**
 * 继承
 * */
//原型链法
 var demo8_1 = function(){
    function One(){
        this.name = 'one';
        this.toString = function(){
            console.log(this.name);
        }
    }

    function Two(){
        this.name = 'two';
    }

    function Three(side,height){
        this.name = 'three';
        this.side = side;
        this.height = height;
        this.getArea = function(){
            console.log('area:' + this.side*this.height/2);
        }
    }

    Two.prototype = new One();
    Two.prototype.constructor = Two;

    Three.prototype = new Two();
    Three.prototype.constructor = Three;

    console.log(new One());
    console.log(new Two());
    console.log(new Three());

    var my = new Three(5,10);
    my.getArea();
    my.toString();
}
//demo8_1();

//仅从原型继承法
var demo8_2 = function(){
    function One(){}
    One.prototype.name = 'one';
    One.prototype.toString = function(){
        console.log(this.name);
    }

    function Two(){}
    Two.prototype = One.prototype;
    Two.prototype.constructor = Two;
    Two.prototype.name = 'two';

    function Three(side,height){
        this.side = side;
        this.height = height;
    }
    Three.prototype = Two.prototype;
    Three.prototype.constructor = Three;
    Three.prototype.name = 'three';
    Three.prototype.getArea = function(){
        console.log('area:' + this.side*this.height/2);
    }

    console.log(new One());
    console.log(new Two());
    console.log(new Three());

    var my = new Three(5,10);
    my.getArea();
    my.toString();
}
//demo8_2();

//临时构造器法 -- new F()
var demo8_3 = function(){
    function One(){
        this.age = 9;  //对象自身属性不会被继承
    }
    One.prototype.name = 'one';
    One.prototype.toString = function(){
        console.log(this.name);
    }

    function Two(){}
    var F = function(){};
    F.prototype = One.prototype;
    Two.prototype = new F();
    Two.prototype.constructor = Two;
    Two.prototype.name = 'two';

    function Three(side,height){
        this.side = side;
        this.height = height;
    }
    var F = function(){};
    F.prototype = Two.prototype;
    Three.prototype = new F();
    Three.prototype.constructor = Three;
    Three.prototype.name = 'three';
    Three.prototype.getArea = function(){
        console.log('area:' + this.side*this.height/2);
    }

    console.log(new One());
    console.log(new Two());
    console.log(new Three());

    var my = new Three(5,10);
    my.getArea();
    my.toString();
}
//demo8_3();

//uber
var demo8_4 = function(){
    function One(){}
    One.prototype.name = 'one';
    One.prototype.toString = function(){
        var result = [];
        if(this.constructor.uber){
            result[result.length] = this.constructor.uber.toString();
        }
        result[result.length] = this.name;
        //return result.join(',');
        console.log(result);
    }

    function Two(){}
    var F = function(){};
    F.prototype = One.prototype;
    Two.prototype = new F();
    Two.prototype.constructor = Two;
    Two.uber = One.prototype;
    Two.prototype.name = 'two';

    function Three(side,height){
        this.side = side;
        this.height = height;
    }
    var F = function(){};
    F.prototype = Two.prototype;
    Three.prototype = new F();
    Three.prototype.constructor = Three;
    Three.uber = Two.prototype;
    Three.prototype.name = 'three';
    Three.prototype.getArea = function(){
        console.log('area:' + this.side*this.height/2);
    }

    console.log(new One());
    console.log(new Two());
    console.log(new Three());

    var my = new Three(5,10);
    my.getArea();
    my.toString();
}
//demo8_4();

//原型属性拷贝法
var demo8_5 = function(){
    function extend(Child,Parent){
        var F = function(){};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.uber = Parent.prototype;
    }

    function One(){
        this.name = 'one';
    }
    One.prototype.age = 20;

    function Two(){
        this.name = 'two';
    }


    var c = {};
    extend(Two,One);
    console.log("Child:%o",new Two().age);
}
demo8_5();