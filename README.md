=====================================================================
####  (￣▽￣)~[ OS ]选项卡插件（3KB）
=====================================================================
##### 为了避免重复构建功能性较为单一的选项卡功能，基于此封装了一个基于JS原生的简单易用的选项卡小插件，初代版可能比较简陋，会根据后面业务需求不断完善。

> 配置参数

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
    
> 引入插件

`<script type="text/javascript" src="./os_1.0.0/os_1.0.0.min.js"></script>`

> 功能配置

    let os = new oS([
        {handlers: "os_0", event: "mouseenter"},
        {handlers: "os_1", performer: "os_options_1", event: "click"},
        {handlers: "os_2", performer: "os_options_2", event: "mouseenter"},
        {handlers: "os_3", event: "mouseenter", type: 1, callback: function() {
            document.getElementById("os_3").classList.add('current')
            this.onmouseleave = function() {
                document.getElementById("os_3").classList.remove('current')
            }
        }}, 
    ]);
    console.log(os) //打印实例内部参数及查看运行状态



###### demo地址传送 --->  <https://li-guanlong.github.io/os_1.0.0/demo.html>

###### 下载插件地址传送 --->  <https://github.com/li-guanlong/OS/tree/main/os_1.0.0>
