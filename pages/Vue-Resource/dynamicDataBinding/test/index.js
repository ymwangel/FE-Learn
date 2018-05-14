// exports.$watch = function (key, fn) {
//     let _fn = function () {
//         fn(arguments[2]);
//     };

//     let pathAry = key.split('.');
//     if (pathAry.length === 1) {
//         this.$data.$observer.on(`set:${key}`, _fn.bind(this));
//     } else {
//         let _temp = this.$data;
//         let lastProperty = pathAry.pop();

//         pathAry.forEach((property) => {
//             _temp = _temp[property];
//         });
//         _temp.$observer.on(`set:${lastProperty}`, _fn.bind(this));
//     }
// };

const objectAugmentations = {};

/**
 * 给对象添加"添加属性"方法
 * 为什么要写这个方法呢?
 * 因为如果没有这个方法, 你直接data.info = {name:"liangshaofeng"},
 * 这样虽然可以修改数据对象,但是却没法监听到这一改变,defineProperty只能监听已经存在的属性
 * 所以需要在添加新的属性的时候调用特殊的方法,下面的delete方法作用与此相同
 * TODO: 添加和删除动作是否需要进行事件传播
 */
define(objectAugmentations, '$add', function (key, val) {
  console.log(this)
    if (this.hasOwnProperty(key)) return;
    define(this, key, val, true);
    let ob = this.$observer;
    ob.observe(key, val);
    ob.convert(key, val);
});

define(objectAugmentations, '$delete', function (key) {
    if (!this.hasOwnProperty(key)) return;
    delete this[key];
});


/**
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method) => {
    let original = Array.prototype[method];
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');
        return original.apply(this, arguments);
    };
});

/**
 * 观察对象
 */

const ARRAY = 0;
const OBJECT = 1;

let uid = 0;

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 * @param type {Int} 数据对象的类型(分为对象和数组)
 * @constructor
 */
function Observer(value, type) {
    this.value = value;
    this.id = ++uid;

    // TODO 这里enumerable一定要为false,否则会触发死循环, 原因未明
    // 将当前对象存储到当前对象的$observer属性中
    Object.defineProperty(value, '$observer', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    });

    if (type === ARRAY) {
        value.__proto__ = arrayAugmentations;  // eslint-disable-line
        this.link(value);
    } else if (type === OBJECT) {
        value.__proto__ = objectAugmentations;  // eslint-disable-line
        this.walk(value);
    }
}

/**
 * 遍历数据对象
 * @param obj {Object} 待遍历的数据对象
 */
Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;

        val = obj[key];

        // 递归
        this.observe(key, val);

        this.convert(key, val);
    }
};

/**
 * 定义对象属性
 * @param key {string} 属性键名
 * @param val {Any} 属性值
 */
Observer.prototype.convert = function (key, val) {
    let ob = this;
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (newVal === val) return;
            val = newVal;
            ob.notify('set', key, newVal);
            ob.notify(`set:${key}`, key, newVal);
        }
    });
};

/**
 * 调用创建observer函数
 * 并且判断是否有父节点,如果有,则存储父节点到自身,
 * 目的是为了方便后面事件传播使用
 * @param key {string} 键值
 * @param val {Any} 属性值
 */
Observer.prototype.observe = function (key, val) {
    let ob = Observer.create(val);
    if (!ob) return;
    ob.parent = {
        key,
        ob: this
    };
};

/**
 * 这个方法是用来处理如下情况: var ary = [1,{name:liangshaofeng}]
 * 也就是说,当数组的某些项是一个对象的时候,
 * 那么需要给这个对象创建observer监听它
 * @param items {Array} 待处理数组
 */
Observer.prototype.link = function (items) {
    items.forEach((value, index) => {
        this.observe(index, value);
    });
};

/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function (event, fn) {
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = [];
    }
    this._cbs[event].push(fn);

    // 这里return this是为了实现.on(...).on(...)这样的级联调用
    return this;
};

/**
 * 取消订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 回调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.off = function (event, fn) {
    this._cbs = this._cbs || {};

    // 取消所有订阅事件
    if (!arguments.length) {
        this._cbs = {};
        return this;
    }

    let callbacks = this._cbs[event];
    if (!callbacks) return this;

    // 取消特定事件
    if (arguments.length === 1) {
        delete this._cbs[event];
        return this;
    }

    // 取消特定事件的特定回调函数
    for (let i = 0, cb; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    return this;
};

/**
 * 触发消息, 并且将消息逐层往上传播
 *
 */
Observer.prototype.notify = function (event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    if (!parent) return;
    let ob = parent.ob;
    ob.notify(event, path, val);
};

/**
 * 触发执行回调函数
 * @param event {string} 事件类型
 * @param event {path} 事件触发路径
 *
 */
Observer.prototype.emit = function (event, path, val) {
    this._cbs = this._cbs || {};
    let callbacks = this._cbs[event];
    if (!callbacks) return;
    callbacks = callbacks.slice(0);
    callbacks.forEach((cb, i) => {
        callbacks[i].apply(this, arguments);
    });
};

/**
 * 根据不同的数据类型,调用observer构造函数
 * @param value {Any} 数据
 * @returns {Observer}
 */
Observer.create = function (value) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }
};


/**
 * 定义对象属性
 * @param obj {Object} 对象
 * @param key {String} 键值
 * @param val {*} 属性值
 * @param enumerable {Boolean} 是否可枚举
 */
/* !! : 强制转换为Boolean*/
function define (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}


function Directive(name, el, vm, expression) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = expression;
    this.attr = 'nodeValue';

    this.update();
}

Directive.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.expression];
    console.log(`更新了DOM-${this.expression}`);
}

function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    _init: function (options) {
      this.$options = options
      this.$data = options.data
      this.$el = document.querySelector(options.el)
      this.$template = this.$el.cloneNode(true)
      this._directives = []

      // 创建观察对象
      this.observer = Observer.create(this.$data);

      this.observer.on('set', this._updateBindingAt.bind(this));

      // 渲染挂载
      this.$mount();
    },
    $mount: function () {
        console.log('我要开始重新渲染啦');
        this._compile();
    },
    _compile: function () {
        this._compileNode(this.$el);
    },
    _compileElement: function (node) {
        if (node.hasChildNodes()) {
            Array.from(node.childNodes).forEach(this._compileNode, this);
        }
    },
    _compileText: function (node) {
        let patt = /{{\w+}}/g;
        let nodeValue = node.nodeValue;
        let expressions = nodeValue.match(patt);  // 这是一个数组,形如["{{name}}"];

        if (!expressions) return;

        expressions.forEach((expression) => {
            let el = document.createTextNode('');
            node.parentNode.insertBefore(el, node);
            let property = expression.replace(/[{}]/g, '');
            this._bindDirective('text', property, el);
        });

        node.parentNode.removeChild(node);
    },
    _compileNode: function (node) {
        switch (node.nodeType) {
            // text
            case 1:
                this._compileElement(node);
                break;
            // node
            case 3 :
                this._compileText(node);
                break;
            default:
                return;
        }
    },
    _bindDirective: function (name, expression, node) {
        let dirs = this._directives;
        dirs.push(
            new Directive(name, node, this, expression)
        );
    },
    _updateBindingAt: function () {
        let path = arguments[1];
        this._directives.forEach((directive) => {
            if (directive.expression !== path) return;
            directive.update();
        });
    }
};

const app = new Bue({
      el: '#app',
      data: {
          name: 'youngwind',
          age: 24,
          address: {
              info: {
                  city: 'beijing'
              }
          },
          message: ['a', 'b', {
              name: 'liangshaofeng',
              age: 24
          }]
      }
  })
  window.app = app;
