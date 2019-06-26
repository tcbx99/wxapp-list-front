"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_progress_1 = require("../../../utils/round_progress");
require("wx-promise-pro");
var app = getApp();
Page({
    data: {
        round_progress: round_progress_1.RoundProgress,
        lists: []
    },
    onLoad: function () {
        var _this = this;
        this.setData({ lists: app.globalData.lists }, function () { _this.drawRoundProgresses(); });
    },
    onReady: function () {
        this.drawRoundProgresses();
    },
    onShow: function () {
        var _this = this;
        this.setData({ lists: app.globalData.lists }, function () { _this.drawRoundProgresses(); });
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onCreateList: function () {
        wx.navigateTo({ url: '/pages/list-modify/list-modify?mode=create' });
    },
    onShowActionSheet: function (e) {
        var _this = this;
        var item = this.data.lists[e.currentTarget.dataset.index];
        wx.pro.showActionSheet({
            itemList: ['编辑清单', '删除清单'],
            itemColor: '#000'
        }).then(function (res) {
            console.log(res);
            console.log(item);
            switch (res.tapIndex) {
                case 0:
                    wx.navigateTo({ url: '/pages/list-modify/list-modify?mode=modify&id=' + item.id });
                    break;
                case 1:
                    app.deleteListById(item.id);
                    _this.onShow();
                    break;
                default:
                    console.error("触发不可能路径");
            }
        }).catch(function () { console.log("ActionSheet Canceled"); });
    },
    drawRoundProgresses: function () {
        console.log("Start drawing canvases");
        var doDraw = function (item) {
            console.log(item);
            var round_me = new round_progress_1.RoundProgress('rp_' + item.id, 8);
            var round_all = new round_progress_1.RoundProgress('rp2_' + item.id, 8);
            round_me.precentage_from = 0;
            round_me.precentage_to
                = round_all.precentage_from
                    = item.items_info.personal_finished_count / item.items_info.all_count * 100;
            round_all.precentage_to = item.items_info.finished_count / item.items_info.all_count * 100;
            round_me.color = 'green';
            round_all.color = 'red';
            console.log(round_me);
            console.log(round_all);
            round_me.draw();
            round_all.draw();
        };
        for (var i in this.data.lists) {
            doDraw(this.data.lists[i]);
            console.log('Drawing Canvas #' + i);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCwwQkFBdUI7QUFFdkIsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLDhCQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFFUDtRQURDLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxjQUFRLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUtELE9BQU8sRUFBRTtRQUNQLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFFUDtRQURDLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxjQUFRLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxZQUFZLEVBQUU7UUFDWixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLDRDQUE0QyxFQUFFLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBS0QsaUJBQWlCLEVBQUUsVUFBVSxDQUFNO1FBQWhCLGlCQXVCbEI7UUF0QkMsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDckIsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUMxQixTQUFTLEVBQUUsTUFBTTtTQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNEM7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLFFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFFcEIsS0FBSyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0RBQWdELEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQ2xGLE1BQUs7Z0JBRVAsS0FBSyxDQUFDO29CQUVKLEdBQUcsQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUM1QixLQUFJLENBQUMsTUFBTSxFQUFHLENBQUE7b0JBQ2QsTUFBSztnQkFDUDtvQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUtELG1CQUFtQixFQUFFO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxVQUFVLElBQVc7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVqQixJQUFJLFFBQVEsR0FBRyxJQUFJLDhCQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFFcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSw4QkFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3RELFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFBO1lBQzVCLFFBQVEsQ0FBQyxhQUFhO2tCQUNsQixTQUFTLENBQUMsZUFBZTtzQkFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7WUFDN0UsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7WUFDMUYsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7WUFDeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNmLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUE7UUFDRCxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDcEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGlzdHMvaW5kZXgvaW5kZXguanNcblxuaW1wb3J0IHsgUm91bmRQcm9ncmVzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3JvdW5kX3Byb2dyZXNzJ1xuaW1wb3J0IHsgSUxpc3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcydcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uL2FwcCdcbmltcG9ydCAnd3gtcHJvbWlzZS1wcm8nXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICByb3VuZF9wcm9ncmVzczogUm91bmRQcm9ncmVzcyxcbiAgICBsaXN0czogW11cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0czogYXBwLmdsb2JhbERhdGEubGlzdHMgfSwgKCkgPT4geyB0aGlzLmRyYXdSb3VuZFByb2dyZXNzZXMoKSB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZHJhd1JvdW5kUHJvZ3Jlc3NlcygpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldERhdGEhKHsgbGlzdHM6IGFwcC5nbG9iYWxEYXRhLmxpc3RzIH0sICgpID0+IHsgdGhpcy5kcmF3Um91bmRQcm9ncmVzc2VzKCkgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgIFxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDliJvlu7rmuIXljZXvvIjnvqTnu4TvvInnmoTlm57osIPlh73mlbBcbiAgICovXG4gIG9uQ3JlYXRlTGlzdDogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1jcmVhdGUnIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOa4heWNleeuoeeQhuWRmOeuoeeQhua4heWNleeahEFjdGlvblNoZWV06LCD5Ye6XG4gICAqL1xuICBvblNob3dBY3Rpb25TaGVldDogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIHZhciBpdGVtOiBJTGlzdCA9IHRoaXMuZGF0YS5saXN0c1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleF1cbiAgICB3eC5wcm8uc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgIGl0ZW1MaXN0OiBbJ+e8lui+kea4heWNlScsICfliKDpmaTmuIXljZUnXSxcbiAgICAgIGl0ZW1Db2xvcjogJyMwMDAnXG4gICAgfSkudGhlbigocmVzOiB3eC5TaG93QWN0aW9uU2hlZXRTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICBzd2l0Y2ggKHJlcy50YXBJbmRleCkge1xuICAgICAgICAvLyDnvJbovpFcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1tb2RpZnkmaWQ9JyArIGl0ZW0uaWQgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyDliKDpmaRcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBUT0RPOiDlj4vlpb3nmoTmj5DnpLpcbiAgICAgICAgICBhcHAuZGVsZXRlTGlzdEJ5SWQgKGl0ZW0uaWQpXG4gICAgICAgICAgdGhpcy5vblNob3cgKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLop6blj5HkuI3lj6/og73ot6/lvoRcIilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7IGNvbnNvbGUubG9nKFwiQWN0aW9uU2hlZXQgQ2FuY2VsZWRcIikgfSlcbiAgfSxcblxuICAvKipcbiAgICog57uY5Yi25ZyG5b2i6L+b5bqm5p2h55qE5riy5p+T5Ye95pWwXG4gICAqL1xuICBkcmF3Um91bmRQcm9ncmVzc2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJTdGFydCBkcmF3aW5nIGNhbnZhc2VzXCIpXG4gICAgdmFyIGRvRHJhdyA9IGZ1bmN0aW9uIChpdGVtOiBJTGlzdCkge1xuICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgIC8vIFJQMTog5Liq5Lq66LSh54yu77yM5pqC5a6a57u/6ImyXG4gICAgICB2YXIgcm91bmRfbWUgPSBuZXcgUm91bmRQcm9ncmVzcygncnBfJyArIGl0ZW0uaWQsIDgpXG4gICAgICAvLyBSUDI6IOmZpOS4quS6uuS5i+WklueahOi0oeeMru+8jOaaguWumue6ouiJslxuICAgICAgdmFyIHJvdW5kX2FsbCA9IG5ldyBSb3VuZFByb2dyZXNzKCdycDJfJyArIGl0ZW0uaWQsIDgpXG4gICAgICByb3VuZF9tZS5wcmVjZW50YWdlX2Zyb20gPSAwXG4gICAgICByb3VuZF9tZS5wcmVjZW50YWdlX3RvXG4gICAgICAgID0gcm91bmRfYWxsLnByZWNlbnRhZ2VfZnJvbVxuICAgICAgICA9IGl0ZW0uaXRlbXNfaW5mby5wZXJzb25hbF9maW5pc2hlZF9jb3VudCAvIGl0ZW0uaXRlbXNfaW5mby5hbGxfY291bnQgKiAxMDBcbiAgICAgIHJvdW5kX2FsbC5wcmVjZW50YWdlX3RvID0gaXRlbS5pdGVtc19pbmZvLmZpbmlzaGVkX2NvdW50IC8gaXRlbS5pdGVtc19pbmZvLmFsbF9jb3VudCAqIDEwMFxuICAgICAgcm91bmRfbWUuY29sb3IgPSAnZ3JlZW4nXG4gICAgICByb3VuZF9hbGwuY29sb3IgPSAncmVkJ1xuICAgICAgY29uc29sZS5sb2cocm91bmRfbWUpXG4gICAgICBjb25zb2xlLmxvZyhyb3VuZF9hbGwpXG4gICAgICByb3VuZF9tZS5kcmF3KClcbiAgICAgIHJvdW5kX2FsbC5kcmF3KClcbiAgICB9XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmRhdGEubGlzdHMpIHtcbiAgICAgIGRvRHJhdyh0aGlzLmRhdGEubGlzdHNbaV0pXG4gICAgICBjb25zb2xlLmxvZygnRHJhd2luZyBDYW52YXMgIycgKyBpKVxuICAgIH1cbiAgfVxufSkiXX0=