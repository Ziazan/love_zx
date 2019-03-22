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
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /*加载地图*/
    MapScene.prototype.onAddToStage = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        /*初始化资源加载路径*/
        this.url = "resource/map/map_demo.tmx";
        // this.url = "resource/map/map_demo1.tmx"; 
        /*初始化请求*/
        this.request = new egret.HttpRequest();
        /*监听资源加载完成事件*/
        this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
        /*发送请求*/
        this.request.open(this.url, egret.HttpMethod.GET);
        this.request.send();
    };
    /*地图加载完成*/
    MapScene.prototype.onMapComplete = function (event) {
        var self = this;
        /*获取到地图数据*/
        var data = egret.XML.parse(event.currentTarget.response);
        /*初始化地图*/
        this.tmxTileMap = new tiled.TMXTilemap(750, 900, data, this.url);
        this.tmxTileMap.touchEnabled = true;
        this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mapMove, this);
        this.tmxTileMap.render();
        // /*将地图添加到显示列表*/
        this.addChild(this.tmxTileMap);
        var tmxObjectLayers = this.tmxTileMap.getObjects();
        tmxObjectLayers.forEach(function (tmxObjectGroup, index) {
            if (tmxObjectGroup.name == 'zx_start') {
                setTimeout(function () {
                    var tmxObject = tmxObjectGroup.getObjectById("3");
                    self.createzhixian(tmxObject);
                    console.log('tmxObject', tmxObject);
                }, 500);
            }
        });
    };
    // 地图移动
    MapScene.prototype.mapMove = function (event) {
        console.log(event.target);
        // event.target.x -= 5;
        // event.target.y -= 5;
        //计算出块的 索引，到map类里面去找到这个块，查看块属性，
        //寻路
        this.zhixian.x = event.localX - (this.zhixian.width / 2);
        this.zhixian.y = event.localY - this.zhixian.height;
    };
    MapScene.prototype.createzhixian = function (tmxObject) {
        var _this = this;
        console.log('tmxObject', tmxObject);
        this.zhixian = new Zhixian();
        //添加的场景中
        this.addChild(this.zhixian);
        //移动到开始位置
        setTimeout(function () {
            _this.zhixian.move(tmxObject.x, tmxObject.y - _this.zhixian.height);
        }, 500);
    };
    return MapScene;
}(egret.DisplayObjectContainer));
__reflect(MapScene.prototype, "MapScene");
