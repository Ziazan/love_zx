class MainScene extends eui.Component implements  eui.UIComponent {
	public Group_mbtn:eui.Group;
	public mbtnPlayer:eui.ToggleButton;
	public mbtnHero:eui.ToggleButton;
    public mbtnGoods:eui.ToggleButton;
    public mbtnAbout:eui.ToggleButton;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		// 让Group可以点击
        this.Group_mbtn.touchEnabled = true;
		// 事件委托, 点击按钮的时候触发toggleBtn
        this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
            let theBtn = <eui.ToggleButton>e.target
            // 在点击触发这个事件的时候,点击的那个btn已经变成了选中状态
            // 判断theBtn是否存在theBtn.selected属性且为true
            if (theBtn.selected && theBtn.selected != undefined) {
                this.toggleBtn(theBtn)
            } else {
                // 当selected为false的时候,说明按钮在点击之前就是选中状态
                // 点击后变成了false,所以这里改回选中状态
                theBtn.selected = true
            }
        }, this)

	}

	/**
     * 切换按钮
     */
    public toggleBtn(btn:eui.ToggleButton) {
        // 先把所有的按钮都设置为不选中
        for (let i = 0; i < this.Group_mbtn.numChildren; i++) {
            let theBtn = <eui.ToggleButton>this.Group_mbtn.getChildAt(i)
            theBtn.selected = false
        }
        // 把传进来的btn设置为选中状态
        btn.selected = true
    }
	
}