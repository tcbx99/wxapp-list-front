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
            console.log(item);
            var round_me = new round_progress_1.RoundProgress('rp_' + item.group_id, 8);
            var round_all = new round_progress_1.RoundProgress('rp2_' + item.group_id, 8);
            round_me.precentage_from = 0;
            round_me.precentage_to
                = round_all.precentage_from
                    = item.missions_info.personal_finished_count / item.missions_info.all_count * 100;
            round_all.precentage_to = item.missions_info.finished_count / item.missions_info.all_count * 100;
            round_me.color = 'green';
            round_all.color = 'red';
            console.log(round_me, round_all);
            round_me.draw();
            round_all.draw();
        };
        for (var i in this.data.lists) {
            doDraw(this.data.lists[i]);
            console.log('Drawing Canvas #' + i);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCwwQkFBdUI7QUFFdkIsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLDhCQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFpQlA7UUFoQkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixHQUFHLEVBQUUsOEJBQThCO3FCQUNwQyxDQUFDLENBQUE7aUJBQ0g7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFBO29CQUN4RCxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3BCO1lBQ0gsQ0FBQyxFQUFFLElBQUksRUFBRTtnQkFDUCxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSw4QkFBOEI7aUJBQ3BDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELFlBQVksRUFBRTtR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SyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDcEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGlzdHMvaW5kZXgvaW5kZXguanNcblxuaW1wb3J0IHsgUm91bmRQcm9ncmVzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3JvdW5kX3Byb2dyZXNzJ1xuaW1wb3J0IHsgSUxpc3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcydcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uL2FwcCdcbmltcG9ydCAnd3gtcHJvbWlzZS1wcm8nXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICByb3VuZF9wcm9ncmVzczogUm91bmRQcm9ncmVzcyxcbiAgICBsaXN0czogW11cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogKHApID0+IHtcbiAgICAgICAgaWYgKCFwLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckluZm9cIl0pIHtcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy93ZWxjb21lL3dlbGNvbWUtZmlyc3QnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5saXN0VXBkYXRlQ2FsbGJhY2sgPSB0aGlzLnJlZnJlc2hQYWdlRGF0YVxuICAgICAgICAgIGFwcC5yZWZyZXNoTGlzdHMoKTtcbiAgICAgICAgfVxuICAgICAgfSwgZmFpbDogKCkgPT4ge1xuICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvd2VsY29tZS93ZWxjb21lLWZpcnN0J1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kcmF3Um91bmRQcm9ncmVzc2VzKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVmcmVzaFBhZ2VEYXRhKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOWIm+W7uua4heWNle+8iOe+pOe7hO+8ieeahOWbnuiwg+WHveaVsFxuICAgKi9cbiAgb25DcmVhdGVMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9saXN0LW1vZGlmeS9saXN0LW1vZGlmeT9tb2RlPWNyZWF0ZScgfSlcbiAgfSxcblxuICAvKipcbiAgICog5riF5Y2V566h55CG5ZGY566h55CG5riF5Y2V55qEQWN0aW9uU2hlZXTosIPlh7pcbiAgICovXG4gIG9uU2hvd0FjdGlvblNoZWV0OiBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgdmFyIGl0ZW06IElMaXN0ID0gdGhpcy5kYXRhLmxpc3RzW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XVxuICAgIHd4LnByby5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgaXRlbUxpc3Q6IFsn57yW6L6R576k57uEJywgJ+WIoOmZpOe+pOe7hCddLFxuICAgICAgaXRlbUNvbG9yOiAnIzAwMCdcbiAgICB9KS50aGVuKChyZXM6IHd4LlNob3dBY3Rpb25TaGVldFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgIHN3aXRjaCAocmVzLnRhcEluZGV4KSB7XG4gICAgICAgIC8vIOe8lui+kVxuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9saXN0LW1vZGlmeS9saXN0LW1vZGlmeT9tb2RlPW1vZGlmeSZpZD0nICsgaXRlbS5ncm91cF9pZCB9KVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIOWIoOmZpFxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gVE9ETzog5Y+L5aW955qE5o+Q56S6XG4gICAgICAgICAgYXBwLmRlbGV0ZUxpc3RCeUlkKGl0ZW0uZ3JvdXBfaWQpXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUGFnZURhdGEoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIuinpuWPkeS4jeWPr+iDvei3r+W+hFwiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHsgY29uc29sZS5sb2coXCJBY3Rpb25TaGVldCBDYW5jZWxlZFwiKSB9KVxuICB9LFxuXG4gIHJlZnJlc2hQYWdlRGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0RGF0YSEoXG4gICAgICB7IGxpc3RzOiBhcHAuZ2xvYmFsRGF0YS5saXN0cyB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYXdSb3VuZFByb2dyZXNzZXMoKVxuICAgICAgfVxuICAgIClcbiAgfSxcblxuICAvKipcbiAgICog57uY5Yi25ZyG5b2i6L+b5bqm5p2h55qE5riy5p+T5Ye95pWwXG4gICAqL1xuICBkcmF3Um91bmRQcm9ncmVzc2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJTdGFydCBkcmF3aW5nIGNhbnZhc2VzXCIpXG4gICAgdmFyIGRvRHJhdyA9IGZ1bmN0aW9uIChpdGVtOiBJTGlzdCkge1xuICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgIC8vIFJQMTog5Liq5Lq66LSh54yu77yM5pqC5a6a57u/6ImyXG4gICAgICB2YXIgcm91bmRfbWUgPSBuZXcgUm91bmRQcm9ncmVzcygncnBfJyArIGl0ZW0uZ3JvdXBfaWQsIDgpXG4gICAgICAvLyBSUDI6IOmZpOS4quS6uuS5i+WklueahOi0oeeMru+8jOaaguWumue6ouiJslxuICAgICAgdmFyIHJvdW5kX2FsbCA9IG5ldyBSb3VuZFByb2dyZXNzKCdycDJfJyArIGl0ZW0uZ3JvdXBfaWQsIDgpXG4gICAgICByb3VuZF9tZS5wcmVjZW50YWdlX2Zyb20gPSAwXG4gICAgICByb3VuZF9tZS5wcmVjZW50YWdlX3RvXG4gICAgICAgID0gcm91bmRfYWxsLnByZWNlbnRhZ2VfZnJvbVxuICAgICAgICA9IGl0ZW0ubWlzc2lvbnNfaW5mby5wZXJzb25hbF9maW5pc2hlZF9jb3VudCAvIGl0ZW0ubWlzc2lvbnNfaW5mby5hbGxfY291bnQgKiAxMDBcbiAgICAgIHJvdW5kX2FsbC5wcmVjZW50YWdlX3RvID0gaXRlbS5taXNzaW9uc19pbmZvLmZpbmlzaGVkX2NvdW50IC8gaXRlbS5taXNzaW9uc19pbmZvLmFsbF9jb3VudCAqIDEwMFxuICAgICAgLy8gXG4gICAgICByb3VuZF9tZS5jb2xvciA9ICdncmVlbidcbiAgICAgIC8vIFxuICAgICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICAgIGNvbnNvbGUubG9nKHJvdW5kX21lLCByb3VuZF9hbGwpXG4gICAgICByb3VuZF9tZS5kcmF3KClcbiAgICAgIHJvdW5kX2FsbC5kcmF3KClcbiAgICB9XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmRhdGEubGlzdHMpIHtcbiAgICAgIGRvRHJhdyh0aGlzLmRhdGEubGlzdHNbaV0pXG4gICAgICBjb25zb2xlLmxvZygnRHJhd2luZyBDYW52YXMgIycgKyBpKVxuICAgIH1cbiAgfVxufSkiXX0=