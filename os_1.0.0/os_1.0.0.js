/**
 * Options Switch Handover / created by Mr.boring007 / 1.0.0 / 2021.07.06
 * config 参数调用说明
 * handlers 事件触发对象的id --- required --- string
 * event 绑定的事件类型 --- selectable --- 默认click --- string
 * performer 事件执行对象的id --- selectable --- string
 * type 功能选择 --- 0(默认)选项卡 --- 1 handlers 事件触发callback --- int
 * callback 回调函数this指向事件触发的当前handlers --- selectable --- object
 * start 事件是否启动 --- selectable --- 默认启动(可自定义条件语句) --- booleans
 * 
 * 例： {handlers: "os_1", performer: "os_options_1", event: "mouseenter",  type: 0, , callback: function() {}},
 */
oS = (function() {
	"use strict";
	let os = function(config) {
		this._config =config;
		config.forEach((ele, i) => {
			this._setParams(i);//参数配置
			this._init(i);//入口函数
		});
	};

	os.prototype = {
		constructor: os,

		_setParams: function(i) {
			let {handlers, event, performer, type, callback, start} = this._config[i];
			this._config[i].handlers = handlers;
			this._config[i].event = event || 'click';
			this._config[i].performer = performer || "";
			this._config[i].type = type || 0;
			this._config[i].callback = callback || this._config[i].callback;
			this._config[i].start = start || true;
			this._config[i].err = [];
			this._config[i].err[0] = false;

			this.log.err(i, this); //参数检测
		},

		isStart: function(i) { //多调用模式下，当前对象是否调用
			if(this._config[i].start && !this._config[i].err[0]) this.bindEve(i);
		},

		bindEve: function(i) { //handlers绑定事件
			let _this = this;
			if (this._config[i].type === 0) {
				let prevCur = 0,
					curIndex = 0,
					binder = document.getElementById(this._config[i].handlers).children;
					
				Array.from(binder).forEach((itm, j) => {
					itm.addEventListener(this._config[i].event, function() {
						curIndex = j;
						_this.setBinderCur(this, binder, prevCur, curIndex, i);
						prevCur = j;

						if (_this._config[i].callback)_this.callbackFun(i, this); //回调函数执行
					});
				});
			} else if (this._config[i].type === 1) {
				let binder = document.getElementById(this._config[i].handlers);

				binder.addEventListener(this._config[i].event, function() {
					if (_this._config[i].callback)_this.callbackFun(i, this); //回调函数执行
				});
			}
			
		},

		setBinderCur: function(_this, binder, prevCur, curIndex, i) { //执行handlers事件
			if (prevCur != curIndex) { //避免无用渲染
				Array.from(binder).forEach(itm => {
					itm.classList.remove("current");
				})

				_this.classList.add("current");
				
				if (this._config[i].performer)this.setPerformerCur(curIndex, i); //是否执行performer事件
			}
		},

		setPerformerCur: function(curIndex, i) { //执行performer事件
			let performer = document.getElementById(this._config[i].performer).children;
			Array.from(performer).forEach(itm => {
				itm.classList.add("hide");
			});

			performer[curIndex].classList.remove("hide");
		},

		_init: function(i) { //启动
			this.isStart(i);
		},

		callbackFun: function(i, _this) { //回调函数执行
			this._config[i].callback.call(_this);
		},

		log: { //日志
			err: function(i, _this) {
				if (_this._config[i].handlers) {
					this.test_1(i, _this);
				} else {
					_this._config[i].err[0] = true;
					_this._config[i].err[1] = "运行失败：配置文件第"+ ++i +"项，缺少必要参数handlers";
				}
			},
			test_1: function(i, _this) {
				let eleExistJudge = document.getElementById(_this._config[i].handlers);
				if (eleExistJudge) {
					
					this.test_2(i, _this);
				} else {
					_this._config[i].err[0] = true;
					_this._config[i].err[1] = '运行失败：配置文件参数handlers:"'+_this._config[i].handlers+'"元素不存在';
				}
			},
			test_2: function(i, _this) {
				let typeJudge = _this._config[i].type,
						dataType = typeof typeJudge === "number" ? true : false,
						hasType = typeJudge === 0 || typeJudge === 1 ? true : false;

				if (!dataType) {
					_this._config[i].err[0] = true;
					_this._config[i].err[1] = '运行失败：配置文件参数type:'+_this._config[i].type+'数据类型错误，传入数据类型为'+typeof typeJudge+'，应为int';
				} else if (!hasType) {
					_this._config[i].err[0] = true;
					_this._config[i].err[1] = '运行失败：配置文件参数type:'+_this._config[i].type+'类型不存在';
				} else {
					_this._config[i].err[0] = false;
					_this._config[i].err[1] = "运行正常";
				};
			}
		}
	};

	return os;
})();