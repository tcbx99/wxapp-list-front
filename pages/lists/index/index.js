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
                    app.globalData.listUpdateCallback = _this.refreshPageData;
                    app.refreshLists();
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
            itemList: ['编辑群组', '删除群组'],
            itemColor: '#000'
        }).then(function (res) {
            console.log(res);
            console.log(item);
            switch (res.tapIndex) {
                case 0:
                    wx.navigateTo({ url: '/pages/list-modify/list-modify?mode=modify&id=' + item.group_id });
                    break;
                case 1:
                    app.deleteListById(item.group_id);
                    _this.refreshPageData();
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
            if (item.mission_info.all_count > 0) {
                console.log(item);
                var round_me = new round_progress_1.RoundProgress('rp_' + item.group_id, 8);
                var round_all = new round_progress_1.RoundProgress('rp2_' + item.group_id, 8);
                round_me.precentage_from = 0;
                round_me.precentage_to
                    = round_all.precentage_from
                        = item.mission_info.personal_finished_count / item.mission_info.all_count * 100;
                round_all.precentage_to = item.mission_info.finished_count / item.mission_info.all_count * 100;
                round_me.color = 'green';
                round_all.color = 'red';
                console.log(round_me, round_all);
                round_me.draw();
                round_all.draw();
            }
        };
        for (var i in this.data.lists) {
            doDraw(this.data.lists[i]);
            console.log('Drawing Canvas #' + i);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCwwQkFBdUI7QUFFdkIsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLDhCQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFpQlA7UUFoQkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixHQUFHLEVBQUUsOEJBQThCO3FCQUNwQyxDQUFDLENBQUE7aUJBQ0g7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFBO29CQUN4RCxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3BCO1lBQ0gsQ0FBQyxFQUFFLElBQUksRUFBRTtnQkFDUCxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSw4QkFBOEI7aUJBQ3BDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELFlBQVksRUFBRTtR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Q2pCO1FBQUEsQ0FBQyxDQUFBO1FBQ0YsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ3BDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2xpc3RzL2luZGV4L2luZGV4LmpzXG5cbmltcG9ydCB7IFJvdW5kUHJvZ3Jlc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9yb3VuZF9wcm9ncmVzcydcbmltcG9ydCB7IElMaXN0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMnXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi8uLi9hcHAnXG5pbXBvcnQgJ3d4LXByb21pc2UtcHJvJ1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5cblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgcm91bmRfcHJvZ3Jlc3M6IFJvdW5kUHJvZ3Jlc3MsXG4gICAgbGlzdHM6IFtdXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3M6IChwKSA9PiB7XG4gICAgICAgIGlmICghcC5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJJbmZvXCJdKSB7XG4gICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvd2VsY29tZS93ZWxjb21lLWZpcnN0J1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubGlzdFVwZGF0ZUNhbGxiYWNrID0gdGhpcy5yZWZyZXNoUGFnZURhdGFcbiAgICAgICAgICBhcHAucmVmcmVzaExpc3RzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3dlbGNvbWUvd2VsY29tZS1maXJzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZHJhd1JvdW5kUHJvZ3Jlc3NlcygpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlZnJlc2hQYWdlRGF0YSgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDliJvlu7rmuIXljZXvvIjnvqTnu4TvvInnmoTlm57osIPlh73mlbBcbiAgICovXG4gIG9uQ3JlYXRlTGlzdDogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1jcmVhdGUnIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOa4heWNleeuoeeQhuWRmOeuoeeQhua4heWNleeahEFjdGlvblNoZWV06LCD5Ye6XG4gICAqL1xuICBvblNob3dBY3Rpb25TaGVldDogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIHZhciBpdGVtOiBJTGlzdCA9IHRoaXMuZGF0YS5saXN0c1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleF1cbiAgICB3eC5wcm8uc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgIGl0ZW1MaXN0OiBbJ+e8lui+kee+pOe7hCcsICfliKDpmaTnvqTnu4QnXSxcbiAgICAgIGl0ZW1Db2xvcjogJyMwMDAnXG4gICAgfSkudGhlbigocmVzOiB3eC5TaG93QWN0aW9uU2hlZXRTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICBzd2l0Y2ggKHJlcy50YXBJbmRleCkge1xuICAgICAgICAvLyDnvJbovpFcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbGlzdC1tb2RpZnkvbGlzdC1tb2RpZnk/bW9kZT1tb2RpZnkmaWQ9JyArIGl0ZW0uZ3JvdXBfaWQgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyDliKDpmaRcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIC8vIFRPRE86IOWPi+WlveeahOaPkOekulxuICAgICAgICAgIGFwcC5kZWxldGVMaXN0QnlJZChpdGVtLmdyb3VwX2lkKVxuICAgICAgICAgIHRoaXMucmVmcmVzaFBhZ2VEYXRhKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLop6blj5HkuI3lj6/og73ot6/lvoRcIilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7IGNvbnNvbGUubG9nKFwiQWN0aW9uU2hlZXQgQ2FuY2VsZWRcIikgfSlcbiAgfSxcblxuICByZWZyZXNoUGFnZURhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldERhdGEhKFxuICAgICAgeyBsaXN0czogYXBwLmdsb2JhbERhdGEubGlzdHMgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5kcmF3Um91bmRQcm9ncmVzc2VzKClcbiAgICAgIH1cbiAgICApXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7mOWItuWchuW9oui/m+W6puadoeeahOa4suafk+WHveaVsFxuICAgKi9cbiAgZHJhd1JvdW5kUHJvZ3Jlc3NlczogZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgZHJhd2luZyBjYW52YXNlc1wiKVxuICAgIHZhciBkb0RyYXcgPSBmdW5jdGlvbiAoaXRlbTogSUxpc3QpIHtcbiAgICAgIGlmIChpdGVtLm1pc3Npb25faW5mby5hbGxfY291bnQgPiAwKXtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAvLyBSUDE6IOS4quS6uui0oeeMru+8jOaaguWumue7v+iJslxuICAgICAgdmFyIHJvdW5kX21lID0gbmV3IFJvdW5kUHJvZ3Jlc3MoJ3JwXycgKyBpdGVtLmdyb3VwX2lkLCA4KVxuICAgICAgLy8gUlAyOiDpmaTkuKrkurrkuYvlpJbnmoTotKHnjK7vvIzmmoLlrprnuqLoibJcbiAgICAgIHZhciByb3VuZF9hbGwgPSBuZXcgUm91bmRQcm9ncmVzcygncnAyXycgKyBpdGVtLmdyb3VwX2lkLCA4KVxuICAgICAgcm91bmRfbWUucHJlY2VudGFnZV9mcm9tID0gMFxuICAgICAgcm91bmRfbWUucHJlY2VudGFnZV90b1xuICAgICAgICA9IHJvdW5kX2FsbC5wcmVjZW50YWdlX2Zyb21cbiAgICAgICAgPSBpdGVtLm1pc3Npb25faW5mby5wZXJzb25hbF9maW5pc2hlZF9jb3VudCAvIGl0ZW0ubWlzc2lvbl9pbmZvLmFsbF9jb3VudCAqIDEwMFxuICAgICAgcm91bmRfYWxsLnByZWNlbnRhZ2VfdG8gPSBpdGVtLm1pc3Npb25faW5mby5maW5pc2hlZF9jb3VudCAvIGl0ZW0ubWlzc2lvbl9pbmZvLmFsbF9jb3VudCAqIDEwMFxuICAgICAgLy8gXG4gICAgICByb3VuZF9tZS5jb2xvciA9ICdncmVlbidcbiAgICAgIC8vIFxuICAgICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICAgIGNvbnNvbGUubG9nKHJvdW5kX21lLCByb3VuZF9hbGwpXG4gICAgICByb3VuZF9tZS5kcmF3KClcbiAgICAgIHJvdW5kX2FsbC5kcmF3KClcbiAgICB9fVxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5kYXRhLmxpc3RzKSB7XG4gICAgICBkb0RyYXcodGhpcy5kYXRhLmxpc3RzW2ldKVxuICAgICAgY29uc29sZS5sb2coJ0RyYXdpbmcgQ2FudmFzICMnICsgaSlcbiAgICB9XG4gIH1cbn0pIl19