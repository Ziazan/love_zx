var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        // 让Group可以点击
        this.Group_mbtn.touchEnabled = true;
        // 事件委托, 点击按钮的时候触发toggleBtn
        this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var theBtn = e.target;
            // 在点击触发这个事件的时候,点击的那个btn已经变成了选中状态
            // 判断theBtn是否存在theBtn.selected属性且为true
            if (theBtn.selected && theBtn.selected != undefined) {
                _this.toggleBtn(theBtn);
            }
            else {
                // 当selected为false的时候,说明按钮在点击之前就是选中状态
                // 点击后变成了false,所以这里改回选中状态
                theBtn.selected = true;
            }
        }, this);
    };
    /**
     * 切换按钮
     */
    MainScene.prototype.toggleBtn = function (btn) {
        // 先把所有的按钮都设置为不选中
        for (var i = 0; i < this.Group_mbtn.numChildren; i++) {
            var theBtn = this.Group_mbtn.getChildAt(i);
            theBtn.selected = false;
        }
        // 把传进来的btn设置为选中状态
        btn.selected = true;
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
