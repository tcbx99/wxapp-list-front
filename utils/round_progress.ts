export class RoundProgress {
  private canvas : wx.CanvasContext;
  private id : string
  public precentage_from : number = 0;
  public precentage_to : number = 0;
  public color: string = '#ff5000';
  public width : number;
  public constructor (_id : string, _width : number) {
    this.id = _id;
    this.width = _width;
    this.canvas = wx.createCanvasContext (this.id)
  }
  public draw () {
    var that = this;
    wx.createSelectorQuery ()
      .select ('#' + this.id)
      .boundingClientRect (function (rect) 
      {
        // 圆心横坐标为canvas宽的一半
        var x : number = rect.width / 2
        // 圆心纵坐标为canvas高的一半
        var y : number = rect.height / 2
        // 半径为canvas宽的一半 - 宽度的一半
        var r : number = (rect.width - that.width) / 2
        // 开始绘制
        var ctx = that.canvas
        // 猴子都能懂的原理：绘制从对应位置(2*x%pi-0.5pi)到对应位置
        var round_from = (2 * Math.PI / 100 * that.precentage_from) - 0.5 * Math.PI;
        var round_to = (2 * Math.PI / 100 * that.precentage_to) - 0.5 * Math.PI
        console.log (round_from + ' ' + round_to)
        ctx.arc (x, y, r, round_from, round_to)
        // 设定颜色宽度
        ctx.setStrokeStyle (that.color)
        ctx.setLineWidth (that.width)
        ctx.setLineCap ("butt")
        // 绘制
        ctx.stroke ()
        ctx.draw (()=>{}, true)
      }).exec ()
  }
}