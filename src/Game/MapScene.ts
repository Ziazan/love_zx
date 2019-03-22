class MapScene extends egret.DisplayObjectContainer {
    /*设置请求*/
    private request:egret.HttpRequest;
    /*设置资源加载路径*/
    private url:string;
    private zhixian:Zhixian;
    private tmxTileMap: tiled.TMXTilemap;

    public constructor() {
        super();    
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    /*加载地图*/
    private onAddToStage () {
        this.width = this.stage.stageWidth
        this.height = this.stage.stageHeight
        /*初始化资源加载路径*/
        this.url = "resource/map/map_demo.tmx"; 
        // this.url = "resource/map/map_demo1.tmx"; 
        /*初始化请求*/
        this.request = new egret.HttpRequest();
        /*监听资源加载完成事件*/
        this.request.once( egret.Event.COMPLETE,this.onMapComplete,this);
        /*发送请求*/
        this.request.open(this.url,egret.HttpMethod.GET);
        this.request.send();
    }
    /*地图加载完成*/
    private onMapComplete( event:egret.Event ) {
         let self: MapScene = this;
        /*获取到地图数据*/
        var data:any = egret.XML.parse(event.currentTarget.response);
        
        /*初始化地图*/
        this.tmxTileMap = new tiled.TMXTilemap(750, 900, data, this.url);
        this.tmxTileMap.touchEnabled = true;
        this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.mapMove,this);
        this.tmxTileMap.render();
        // /*将地图添加到显示列表*/
        this.addChild(this.tmxTileMap);

        let tmxObjectLayers = this.tmxTileMap.getObjects();
        tmxObjectLayers.forEach((tmxObjectGroup,index)=>{
            if(tmxObjectGroup.name == 'zx_start'){//获取zhixian 开始的位置
                setTimeout(()=>{//设置一个延迟，问题解决
                    let tmxObject = tmxObjectGroup.getObjectById("3");
                    self.createzhixian(tmxObject);
                    console.log('tmxObject',tmxObject);
                },500);
            }
        });
    }
    // 地图移动
    private mapMove(event:egret.TouchEvent){
        event.target.x -= 5;
        event.target.y -= 5;
    }
    private createzhixian(tmxObject:tiled.TMXObject) {
        console.log('tmxObject',tmxObject);
        this.zhixian = new Zhixian()
        //添加的场景中
        this.addChild(this.zhixian)
        //移动到开始位置
        setTimeout(()=>{
            this.zhixian.move(tmxObject.x,tmxObject.y - this.zhixian.height);
        },500);
        
    }
}