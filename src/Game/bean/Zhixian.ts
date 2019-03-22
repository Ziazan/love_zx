enum CatStatus {
    AVAILABLE = 0, // 还有路走
    UNAVAILABLE = 1 // 无路可走
}

/**
 * Zhixian
 */
class Zhixian extends egret.Sprite {

    private catMovieClip = {
        normal: GameUtil.createMovieClipByName('girl_walk'),
        loser: GameUtil.createMovieClipByName('girl_walk'),
    }
    /**
     * 猫的状态
     */
    private status: CatStatus
    /**
     * 猫在数组中的下标
     */
    private bg: egret.MovieClip

    private hasNextStep:boolean


    public constructor() {
        super()

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event:egret.Event){
        this.init()
    }

    private init() {
        console.log('zx init');
        this.bg = new egret.MovieClip()
        this.addChild(this.bg)
        this.setStatus(CatStatus.AVAILABLE)
    }
    public setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status
        this.changeBg()
    }

    private changeBg() {
        this.bg.movieClipData = this.catMovieClip.normal.movieClipData
        this.bg.play(-1)
    }
    private nextStep():void{
         //判断下一步能不能走  
         this.hasNextStep = false; 
    }
    public move(x:number,y:number) {
        console.log('x',x);
        console.log('y',y);
        this.x = x || GameUtil.getStageWidth() / 2
        this.y = y || GameUtil.getStageHeight() / 2
    }


}