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
        wx.getSetting({
            success: function (p) {
                if (!p.authSetting["scope.userInfo"]) {
                    wx.redirectTo({
                        url: '/pages/welcome/welcome-first'
                    });
                }
                else {
                    _this.refreshPageData();
                }
            }, fail: function () {
                wx.redirectTo({
                    url: '/pages/welcome/welcome-first'
                });
            }
        });
    },
    onReady: function () {
        this.drawRoundProgresses();
    },
    onShow: function () {
        this.refreshPageData();
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
    refreshPageData: function () {
        var _this = this;
        this.setData({ lists: app.globalData.lists }, function () {
            _this.drawRoundProgresses();
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCwwQkFBdUI7QUFFdkIsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLDhCQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFnQlA7UUFmQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDO3dCQUNaLEdBQUcsRUFBRSw4QkFBOEI7cUJBQ3BDLENBQUMsQ0FBQTtpQkFDSDtxQkFBTTtvQkFDTCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7aUJBQ3ZCO1lBQ0gsQ0FBQyxFQUFFLElBQUksRUFBRTtnQkFDUCxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSw4QkFBOEI7aUJBQ3BDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELFlBQVksRUFBRTtRQUNaLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsNENBQTRDLEVBQUUsQ0FBQyxDQUFB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QUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDcEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGlzdHMvaW5kZXgvaW5kZXguanNcblxuaW1wb3J0IHsgUm91bmRQcm9ncmVzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3JvdW5kX3Byb2dyZXNzJ1xuaW1wb3J0IHsgSUxpc3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcydcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uL2FwcCdcbmltcG9ydCAnd3gtcHJvbWlzZS1wcm8nXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICByb3VuZF9wcm9ncmVzczogUm91bmRQcm9ncmVzcyxcbiAgICBsaXN0czogW11cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogKHApID0+IHtcbiAgICAgICAgaWYgKCFwLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckluZm9cIl0pIHtcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy93ZWxjb21lL3dlbGNvbWUtZmlyc3QnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlZnJlc2hQYWdlRGF0YSgpXG4gICAgICAgIH1cbiAgICAgIH0sIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3dlbGNvbWUvd2VsY29tZS1maXJzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZHJhd1JvdW5kUHJvZ3Jlc3NlcygpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlZnJlc2hQYWdlRGF0YSgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDliJvlu7rmuIXljZXvvIjnvqTnu4TvvInnmoTlm57osIPlh73mlbBcbiAgICovXG4gIG9uQ3JlYXRlTGlzdDogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1jcmVhdGUnIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOa4heWNleeuoeeQhuWRmOeuoeeQhua4heWNleeahEFjdGlvblNoZWV06LCD5Ye6XG4gICAqL1xuICBvblNob3dBY3Rpb25TaGVldDogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIHZhciBpdGVtOiBJTGlzdCA9IHRoaXMuZGF0YS5saXN0c1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleF1cbiAgICB3eC5wcm8uc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgIGl0ZW1MaXN0OiBbJ+e8lui+kea4heWNlScsICfliKDpmaTmuIXljZUnXSxcbiAgICAgIGl0ZW1Db2xvcjogJyMwMDAnXG4gICAgfSkudGhlbigocmVzOiB3eC5TaG93QWN0aW9uU2hlZXRTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICBzd2l0Y2ggKHJlcy50YXBJbmRleCkge1xuICAgICAgICAvLyDnvJbovpFcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1tb2RpZnkmaWQ9JyArIGl0ZW0uaWQgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyDliKDpmaRcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIC8vIFRPRE86IOWPi+WlveeahOaPkOekulxuICAgICAgICAgIGFwcC5kZWxldGVMaXN0QnlJZChpdGVtLmlkKVxuICAgICAgICAgIHRoaXMub25TaG93KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLop6blj5HkuI3lj6/og73ot6/lvoRcIilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7IGNvbnNvbGUubG9nKFwiQWN0aW9uU2hlZXQgQ2FuY2VsZWRcIikgfSlcbiAgfSxcblxuICByZWZyZXNoUGFnZURhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldERhdGEhKFxuICAgICAgeyBsaXN0czogYXBwLmdsb2JhbERhdGEubGlzdHMgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5kcmF3Um91bmRQcm9ncmVzc2VzKClcbiAgICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7mOWItuWchuW9oui/m+W6puadoeeahOa4suafk+WHveaVsFxuICAgKi9cbiAgZHJhd1JvdW5kUHJvZ3Jlc3NlczogZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgZHJhd2luZyBjYW52YXNlc1wiKVxuICAgIHZhciBkb0RyYXcgPSBmdW5jdGlvbiAoaXRlbTogSUxpc3QpIHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAvLyBSUDE6IOS4quS6uui0oeeMru+8jOaaguWumue7v+iJslxuICAgICAgdmFyIHJvdW5kX21lID0gbmV3IFJvdW5kUHJvZ3Jlc3MoJ3JwXycgKyBpdGVtLmlkLCA4KVxuICAgICAgLy8gUlAyOiDpmaTkuKrkurrkuYvlpJbnmoTotKHnjK7vvIzmmoLlrprnuqLoibJcbiAgICAgIHZhciByb3VuZF9hbGwgPSBuZXcgUm91bmRQcm9ncmVzcygncnAyXycgKyBpdGVtLmlkLCA4KVxuICAgICAgcm91bmRfbWUucHJlY2VudGFnZV9mcm9tID0gMFxuICAgICAgcm91bmRfbWUucHJlY2VudGFnZV90b1xuICAgICAgICA9IHJvdW5kX2FsbC5wcmVjZW50YWdlX2Zyb21cbiAgICAgICAgPSBpdGVtLml0ZW1zX2luZm8ucGVyc29uYWxfZmluaXNoZWRfY291bnQgLyBpdGVtLml0ZW1zX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgICByb3VuZF9hbGwucHJlY2VudGFnZV90byA9IGl0ZW0uaXRlbXNfaW5mby5maW5pc2hlZF9jb3VudCAvIGl0ZW0uaXRlbXNfaW5mby5hbGxfY291bnQgKiAxMDBcbiAgICAgIHJvdW5kX21lLmNvbG9yID0gJ2dyZWVuJ1xuICAgICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICAgIGNvbnNvbGUubG9nKHJvdW5kX21lKVxuICAgICAgY29uc29sZS5sb2cocm91bmRfYWxsKVxuICAgICAgcm91bmRfbWUuZHJhdygpXG4gICAgICByb3VuZF9hbGwuZHJhdygpXG4gICAgfVxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5kYXRhLmxpc3RzKSB7XG4gICAgICBkb0RyYXcodGhpcy5kYXRhLmxpc3RzW2ldKVxuICAgICAgY29uc29sZS5sb2coJ0RyYXdpbmcgQ2FudmFzICMnICsgaSlcbiAgICB9XG4gIH1cbn0pIl19