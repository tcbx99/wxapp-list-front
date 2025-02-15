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
            var x = 56 / 2;
            var y = 56 / 2;
            var r = (56 - that.width) / 2;
            if (r > 0) {
                var ctx = that.canvas;
                ctx.clearRect(rect.height, rect.width, 0, 0);
                var round_from = (2 * Math.PI / 100 * that.precentage_from) - 0.5 * Math.PI;
                var round_to = (2 * Math.PI / 100 * that.precentage_to) - 0.5 * Math.PI;
                console.log(x, y, r, round_from, round_to);
                ctx.arc(x, y, r, round_from, round_to);
                ctx.strokeStyle = that.color;
                ctx.lineWidth = that.width;
                ctx.lineCap = 'butt';
                ctx.stroke();
                ctx.draw(function () { }, false);
            }
        }).exec();
    };
    return RoundProgress;
}());
exports.RoundProgress = RoundProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmRfcHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb3VuZF9wcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBT0UsdUJBQW1CLEdBQVcsRUFBRSxNQUFjO1FBSnZDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFHL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUNNLDRCQUFJLEdBQVg7UUFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFO2FBQ3JCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNyQixrQkFBa0IsQ0FBQyxVQUFVLElBQUk7WUFFaEMsSUFBSSxDQUFDLEdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUV0QixJQUFJLENBQUMsR0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBRXRCLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7Z0JBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFFNUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM1RSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7Z0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUMxQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFFdEMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUM1QixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQzFCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO2dCQUVwQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUMzQjtRQUNILENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSb3VuZFByb2dyZXNzIHtcbiAgcHJpdmF0ZSBjYW52YXM6IHd4LkNhbnZhc0NvbnRleHQ7XG4gIHByaXZhdGUgaWQ6IHN0cmluZ1xuICBwdWJsaWMgcHJlY2VudGFnZV9mcm9tOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgcHJlY2VudGFnZV90bzogbnVtYmVyID0gMDtcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAnI2ZmNTAwMCc7XG4gIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuICBwdWJsaWMgY29uc3RydWN0b3IoX2lkOiBzdHJpbmcsIF93aWR0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5pZCA9IF9pZDtcbiAgICB0aGlzLndpZHRoID0gX3dpZHRoO1xuICAgIHRoaXMuY2FudmFzID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCh0aGlzLmlkKVxuICB9XG4gIHB1YmxpYyBkcmF3KCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KClcbiAgICAgIC5zZWxlY3QoJyMnICsgdGhpcy5pZClcbiAgICAgIC5ib3VuZGluZ0NsaWVudFJlY3QoZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgICAgLy8g5ZyG5b+D5qiq5Z2Q5qCH5Li6Y2FudmFz5a6955qE5LiA5Y2KXG4gICAgICAgIHZhciB4OiBudW1iZXIgPSA1NiAvIDJcbiAgICAgICAgLy8g5ZyG5b+D57q15Z2Q5qCH5Li6Y2FudmFz6auY55qE5LiA5Y2KXG4gICAgICAgIHZhciB5OiBudW1iZXIgPSA1NiAvIDJcbiAgICAgICAgLy8g5Y2K5b6E5Li6Y2FudmFz5a6955qE5LiA5Y2KIC0g5a695bqm55qE5LiA5Y2KXG4gICAgICAgIHZhciByOiBudW1iZXIgPSAoNTYgLSB0aGF0LndpZHRoKSAvIDJcbiAgICAgICAgaWYgKHIgPiAwKSB7XG4gICAgICAgICAgLy8g5byA5aeL57uY5Yi2XG4gICAgICAgICAgdmFyIGN0eCA9IHRoYXQuY2FudmFzXG4gICAgICAgICAgY3R4LmNsZWFyUmVjdChyZWN0LmhlaWdodCwgcmVjdC53aWR0aCwgMCwgMClcbiAgICAgICAgICAvLyDnjLTlrZDpg73og73mh4LnmoTljp/nkIbvvJrnu5jliLbku47lr7nlupTkvY3nva4oMip4JXBpLTAuNXBpKeWIsOWvueW6lOS9jee9rlxuICAgICAgICAgIHZhciByb3VuZF9mcm9tID0gKDIgKiBNYXRoLlBJIC8gMTAwICogdGhhdC5wcmVjZW50YWdlX2Zyb20pIC0gMC41ICogTWF0aC5QSTtcbiAgICAgICAgICB2YXIgcm91bmRfdG8gPSAoMiAqIE1hdGguUEkgLyAxMDAgKiB0aGF0LnByZWNlbnRhZ2VfdG8pIC0gMC41ICogTWF0aC5QSVxuICAgICAgICAgIGNvbnNvbGUubG9nKHgsIHksIHIsIHJvdW5kX2Zyb20sIHJvdW5kX3RvKVxuICAgICAgICAgIGN0eC5hcmMoeCwgeSwgciwgcm91bmRfZnJvbSwgcm91bmRfdG8pXG4gICAgICAgICAgLy8g6K6+5a6a6aKc6Imy5a695bqmXG4gICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhhdC5jb2xvclxuICAgICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGF0LndpZHRoXG4gICAgICAgICAgY3R4LmxpbmVDYXAgPSAnYnV0dCdcbiAgICAgICAgICAvLyDnu5jliLZcbiAgICAgICAgICBjdHguc3Ryb2tlKClcbiAgICAgICAgICBjdHguZHJhdygoKSA9PiB7IH0sIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9KS5leGVjKClcbiAgfVxufSJdfQ==