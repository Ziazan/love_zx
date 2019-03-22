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
var CatStatus;
(function (CatStatus) {
    CatStatus[CatStatus["AVAILABLE"] = 0] = "AVAILABLE";
    CatStatus[CatStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE"; // 无路可走
})(CatStatus || (CatStatus = {}));
/**
 * Zhixian
 */
var Zhixian = (function (_super) {
    __extends(Zhixian, _super);
    function Zhixian() {
        var _this = _super.call(this) || this;
        _this.catMovieClip = {
            normal: GameUtil.createMovieClipByName('girl_walk'),
            loser: GameUtil.createMovieClipByName('girl_walk'),
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Zhixian.prototype.onAddToStage = function (event) {
        this.init();
    };
    Zhixian.prototype.init = function () {
        console.log('zx init');
        this.bg = new egret.MovieClip();
        this.addChild(this.bg);
        this.setStatus(CatStatus.AVAILABLE);
    };
    Zhixian.prototype.setStatus = function (status) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.changeBg();
    };
    Zhixian.prototype.changeBg = function () {
        this.bg.movieClipData = this.catMovieClip.normal.movieClipData;
        this.bg.play(-1);
    };
    Zhixian.prototype.move = function (x, y) {
        console.log('x', x);
        console.log('y', y);
        this.x = x || GameUtil.getStageWidth() / 2;
        this.y = y || GameUtil.getStageHeight() / 2;
    };
    return Zhixian;
}(egret.Sprite));
__reflect(Zhixian.prototype, "Zhixian");
