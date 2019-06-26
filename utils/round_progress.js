"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoundProgress = (function () {
    function RoundProgress(_id, _width) {
        this.precentage_from = 0;
        this.precentage_to = 0;
        this.color = '#ff5000';
        this.id = _id;
        this.width = _width;
        this.canvas = wx.createCanvasContext(this.id);
    }
    RoundProgress.prototype.draw = function () {
        var that = this;
        wx.createSelectorQuery()
            .select('#' + this.id)
            .boundingClientRect(function (rect) {
            var x = rect.width / 2;
            var y = rect.height / 2;
            var r = (rect.width - that.width) / 2;
            var ctx = that.canvas;
            var round_from = (2 * Math.PI / 100 * that.precentage_from) - 0.5 * Math.PI;
            var round_to = (2 * Math.PI / 100 * that.precentage_to) - 0.5 * Math.PI;
            console.log(round_from + ' ' + round_to);
            ctx.arc(x, y, r, round_from, round_to);
            ctx.setStrokeStyle(that.color);
            ctx.setLineWidth(that.width);
            ctx.setLineCap("butt");
            ctx.stroke();
            ctx.draw(function () { }, true);
        }).exec();
    };
    return RoundProgress;
}());
exports.RoundProgress = RoundProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmRfcHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb3VuZF9wcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBT0UsdUJBQW9CLEdBQVksRUFBRSxNQUFlO1FBSjFDLG9CQUFlLEdBQVksQ0FBQyxDQUFDO1FBQzdCLGtCQUFhLEdBQVksQ0FBQyxDQUFDO1FBQzNCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFHL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUNNLDRCQUFJLEdBQVg7UUFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixFQUFHO2FBQ3RCLE1BQU0sQ0FBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUN0QixrQkFBa0IsQ0FBRSxVQUFVLElBQUk7WUFHakMsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7WUFFL0IsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFaEMsSUFBSSxDQUFDLEdBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtZQUVyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDNUUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQTtZQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUV2QyxHQUFHLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMvQixHQUFHLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixHQUFHLENBQUMsVUFBVSxDQUFFLE1BQU0sQ0FBQyxDQUFBO1lBRXZCLEdBQUcsQ0FBQyxNQUFNLEVBQUcsQ0FBQTtZQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUUsY0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFHLENBQUE7SUFDZCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJvdW5kUHJvZ3Jlc3Mge1xuICBwcml2YXRlIGNhbnZhcyA6IHd4LkNhbnZhc0NvbnRleHQ7XG4gIHByaXZhdGUgaWQgOiBzdHJpbmdcbiAgcHVibGljIHByZWNlbnRhZ2VfZnJvbSA6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBwcmVjZW50YWdlX3RvIDogbnVtYmVyID0gMDtcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAnI2ZmNTAwMCc7XG4gIHB1YmxpYyB3aWR0aCA6IG51bWJlcjtcbiAgcHVibGljIGNvbnN0cnVjdG9yIChfaWQgOiBzdHJpbmcsIF93aWR0aCA6IG51bWJlcikge1xuICAgIHRoaXMuaWQgPSBfaWQ7XG4gICAgdGhpcy53aWR0aCA9IF93aWR0aDtcbiAgICB0aGlzLmNhbnZhcyA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQgKHRoaXMuaWQpXG4gIH1cbiAgcHVibGljIGRyYXcgKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5ICgpXG4gICAgICAuc2VsZWN0ICgnIycgKyB0aGlzLmlkKVxuICAgICAgLmJvdW5kaW5nQ2xpZW50UmVjdCAoZnVuY3Rpb24gKHJlY3QpIFxuICAgICAge1xuICAgICAgICAvLyDlnIblv4PmqKrlnZDmoIfkuLpjYW52YXPlrr3nmoTkuIDljYpcbiAgICAgICAgdmFyIHggOiBudW1iZXIgPSByZWN0LndpZHRoIC8gMlxuICAgICAgICAvLyDlnIblv4PnurXlnZDmoIfkuLpjYW52YXPpq5jnmoTkuIDljYpcbiAgICAgICAgdmFyIHkgOiBudW1iZXIgPSByZWN0LmhlaWdodCAvIDJcbiAgICAgICAgLy8g5Y2K5b6E5Li6Y2FudmFz5a6955qE5LiA5Y2KIC0g5a695bqm55qE5LiA5Y2KXG4gICAgICAgIHZhciByIDogbnVtYmVyID0gKHJlY3Qud2lkdGggLSB0aGF0LndpZHRoKSAvIDJcbiAgICAgICAgLy8g5byA5aeL57uY5Yi2XG4gICAgICAgIHZhciBjdHggPSB0aGF0LmNhbnZhc1xuICAgICAgICAvLyDnjLTlrZDpg73og73mh4LnmoTljp/nkIbvvJrnu5jliLbku47lr7nlupTkvY3nva4oMip4JXBpLTAuNXBpKeWIsOWvueW6lOS9jee9rlxuICAgICAgICB2YXIgcm91bmRfZnJvbSA9ICgyICogTWF0aC5QSSAvIDEwMCAqIHRoYXQucHJlY2VudGFnZV9mcm9tKSAtIDAuNSAqIE1hdGguUEk7XG4gICAgICAgIHZhciByb3VuZF90byA9ICgyICogTWF0aC5QSSAvIDEwMCAqIHRoYXQucHJlY2VudGFnZV90bykgLSAwLjUgKiBNYXRoLlBJXG4gICAgICAgIGNvbnNvbGUubG9nIChyb3VuZF9mcm9tICsgJyAnICsgcm91bmRfdG8pXG4gICAgICAgIGN0eC5hcmMgKHgsIHksIHIsIHJvdW5kX2Zyb20sIHJvdW5kX3RvKVxuICAgICAgICAvLyDorr7lrprpopzoibLlrr3luqZcbiAgICAgICAgY3R4LnNldFN0cm9rZVN0eWxlICh0aGF0LmNvbG9yKVxuICAgICAgICBjdHguc2V0TGluZVdpZHRoICh0aGF0LndpZHRoKVxuICAgICAgICBjdHguc2V0TGluZUNhcCAoXCJidXR0XCIpXG4gICAgICAgIC8vIOe7mOWItlxuICAgICAgICBjdHguc3Ryb2tlICgpXG4gICAgICAgIGN0eC5kcmF3ICgoKT0+e30sIHRydWUpXG4gICAgICB9KS5leGVjICgpXG4gIH1cbn0iXX0=