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
        var _this = this;
        app.globalData.api.getGroups().then(function (r) {
            app.globalData.lists = r;
            _this.refreshPageData();
            wx.stopPullDownRefresh({});
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCwwQkFBdUI7QUFFdkIsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLDhCQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFpQlA7UUFoQkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixHQUFHLEVBQUUsOEJBQThCO3FCQUNwQyxDQUFDLENBQUE7aUJBQ0g7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFBO29CQUN4RCxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3BCO1lBQ0gsQ0FBQyxFQUFFLElBQUksRUFBRTtnQkFDUCxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSw4QkFBOEI7aUJBQ3BDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtRQUFBLGlCQU9sQjtRQU5DLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBSSxDQUFDLFNBQVMs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LFlBQVksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO2dCQUU5RixRQUFRLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtnQkFFeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFBO2dCQUNoQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ2YsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2pCO1FBQUEsQ0FBQyxDQUFBO1FBQ0YsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ3BDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2xpc3RzL2luZGV4L2luZGV4LmpzXG5cbmltcG9ydCB7IFJvdW5kUHJvZ3Jlc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9yb3VuZF9wcm9ncmVzcydcbmltcG9ydCB7IElMaXN0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMnXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi8uLi9hcHAnXG5pbXBvcnQgJ3d4LXByb21pc2UtcHJvJ1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5cblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgcm91bmRfcHJvZ3Jlc3M6IFJvdW5kUHJvZ3Jlc3MsXG4gICAgbGlzdHM6IFtdXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3M6IChwKSA9PiB7XG4gICAgICAgIGlmICghcC5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJJbmZvXCJdKSB7XG4gICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvd2VsY29tZS93ZWxjb21lLWZpcnN0J1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubGlzdFVwZGF0ZUNhbGxiYWNrID0gdGhpcy5yZWZyZXNoUGFnZURhdGFcbiAgICAgICAgICBhcHAucmVmcmVzaExpc3RzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3dlbGNvbWUvd2VsY29tZS1maXJzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZHJhd1JvdW5kUHJvZ3Jlc3NlcygpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlZnJlc2hQYWdlRGF0YSgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuZ2xvYmFsRGF0YS5hcGkhLmdldEdyb3VwcygpLnRoZW4oKHIpPT57XG4gICAgICBhcHAuZ2xvYmFsRGF0YS5saXN0cyA9IHJcbiAgICAgIHRoaXMucmVmcmVzaFBhZ2VEYXRhKClcbiAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goe30pXG4gICAgfSlcbiAgICBcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog5Yib5bu65riF5Y2V77yI576k57uE77yJ55qE5Zue6LCD5Ye95pWwXG4gICAqL1xuICBvbkNyZWF0ZUxpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2xpc3QtbW9kaWZ5L2xpc3QtbW9kaWZ5P21vZGU9Y3JlYXRlJyB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDmuIXljZXnrqHnkIblkZjnrqHnkIbmuIXljZXnmoRBY3Rpb25TaGVldOiwg+WHulxuICAgKi9cbiAgb25TaG93QWN0aW9uU2hlZXQ6IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICB2YXIgaXRlbTogSUxpc3QgPSB0aGlzLmRhdGEubGlzdHNbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhdXG4gICAgd3gucHJvLnNob3dBY3Rpb25TaGVldCh7XG4gICAgICBpdGVtTGlzdDogWyfnvJbovpHnvqTnu4QnLCAn5Yig6Zmk576k57uEJ10sXG4gICAgICBpdGVtQ29sb3I6ICcjMDAwJ1xuICAgIH0pLnRoZW4oKHJlczogd3guU2hvd0FjdGlvblNoZWV0U3VjY2Vzc0NhbGxiYWNrUmVzdWx0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgc3dpdGNoIChyZXMudGFwSW5kZXgpIHtcbiAgICAgICAgLy8g57yW6L6RXG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2xpc3QtbW9kaWZ5L2xpc3QtbW9kaWZ5P21vZGU9bW9kaWZ5JmlkPScgKyBpdGVtLmdyb3VwX2lkIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8g5Yig6ZmkXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAvLyBUT0RPOiDlj4vlpb3nmoTmj5DnpLpcbiAgICAgICAgICBhcHAuZGVsZXRlTGlzdEJ5SWQoaXRlbS5ncm91cF9pZClcbiAgICAgICAgICB0aGlzLnJlZnJlc2hQYWdlRGF0YSgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6Kem5Y+R5LiN5Y+v6IO96Lev5b6EXCIpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4geyBjb25zb2xlLmxvZyhcIkFjdGlvblNoZWV0IENhbmNlbGVkXCIpIH0pXG4gIH0sXG5cbiAgcmVmcmVzaFBhZ2VEYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXREYXRhIShcbiAgICAgIHsgbGlzdHM6IGFwcC5nbG9iYWxEYXRhLmxpc3RzIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhd1JvdW5kUHJvZ3Jlc3NlcygpXG4gICAgICB9XG4gICAgKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnu5jliLblnIblvaLov5vluqbmnaHnmoTmuLLmn5Plh73mlbBcbiAgICovXG4gIGRyYXdSb3VuZFByb2dyZXNzZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IGRyYXdpbmcgY2FudmFzZXNcIilcbiAgICB2YXIgZG9EcmF3ID0gZnVuY3Rpb24gKGl0ZW06IElMaXN0KSB7XG4gICAgICBpZiAoaXRlbS5taXNzaW9uX2luZm8uYWxsX2NvdW50ID4gMCl7XG4gICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgLy8gUlAxOiDkuKrkurrotKHnjK7vvIzmmoLlrprnu7/oibJcbiAgICAgIHZhciByb3VuZF9tZSA9IG5ldyBSb3VuZFByb2dyZXNzKCdycF8nICsgaXRlbS5ncm91cF9pZCwgOClcbiAgICAgIC8vIFJQMjog6Zmk5Liq5Lq65LmL5aSW55qE6LSh54yu77yM5pqC5a6a57qi6ImyXG4gICAgICB2YXIgcm91bmRfYWxsID0gbmV3IFJvdW5kUHJvZ3Jlc3MoJ3JwMl8nICsgaXRlbS5ncm91cF9pZCwgOClcbiAgICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfZnJvbSA9IDBcbiAgICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfdG9cbiAgICAgICAgPSByb3VuZF9hbGwucHJlY2VudGFnZV9mcm9tXG4gICAgICAgID0gaXRlbS5taXNzaW9uX2luZm8ucGVyc29uYWxfZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25faW5mby5hbGxfY291bnQgKiAxMDBcbiAgICAgIHJvdW5kX2FsbC5wcmVjZW50YWdlX3RvID0gaXRlbS5taXNzaW9uX2luZm8uZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25faW5mby5hbGxfY291bnQgKiAxMDBcbiAgICAgIC8vIFxuICAgICAgcm91bmRfbWUuY29sb3IgPSAnZ3JlZW4nXG4gICAgICAvLyBcbiAgICAgIHJvdW5kX2FsbC5jb2xvciA9ICdyZWQnXG4gICAgICBjb25zb2xlLmxvZyhyb3VuZF9tZSwgcm91bmRfYWxsKVxuICAgICAgcm91bmRfbWUuZHJhdygpXG4gICAgICByb3VuZF9hbGwuZHJhdygpXG4gICAgfX1cbiAgICBmb3IgKHZhciBpIGluIHRoaXMuZGF0YS5saXN0cykge1xuICAgICAgZG9EcmF3KHRoaXMuZGF0YS5saXN0c1tpXSlcbiAgICAgIGNvbnNvbGUubG9nKCdEcmF3aW5nIENhbnZhcyAjJyArIGkpXG4gICAgfVxuICB9XG59KSJdfQ==