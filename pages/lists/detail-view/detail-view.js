"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_progress_1 = require("../../../utils/round_progress");
var app = getApp();
var api = app.globalData.api;
Page({
    data: {
        group: {},
        lists: [],
        is_admin: true
    },
    onLoad: function (options) {
        var _this = this;
        var list = app.getListById(+options.id);
        this.setData({ group: list, is_admin: list.is_admin }, function () {
            console.log('onLoad');
            _this.doDraw();
            wx.setNavigationBarTitle({ title: list.group_name });
            api.getMissions(+options.id, list.is_admin).then(function (r) {
                _this.setData({
                    lists: r
                });
            });
        });
    },
    onReady: function () {
    },
    onShow: function () {
        var _this = this;
        var list = app.getListById(this.data.group.group_id);
        this.setData({ group: list, is_admin: list.is_admin }, function () {
            console.log('onLoad');
            _this.doDraw();
            wx.setNavigationBarTitle({ title: list.group_name });
            api.getMissions(_this.data.group.group_id, list.is_admin).then(function (r) {
                _this.setData({
                    lists: r
                });
            });
        });
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.onPullDownRefresh();
        wx.stopPullDownRefresh({});
    },
    onReachBottom: function () {
    },
    onChange: function (e) {
        var _this = this;
        console.log(e);
        var lists = this.data.lists;
        for (var i in lists) {
            if (lists[i].mission_id == +e.currentTarget.dataset.id) {
                if (lists[i].finish_type == 1 && this.data.is_admin) {
                    new Promise(function (r) {
                        wx.showModal({
                            title: "",
                            content: "确定要驳回此任务的完成状态吗？此操作不可撤销",
                            success: r
                        });
                    }).then(function (r) {
                        if (r.confirm) {
                            return api.rejectMission(lists[i]).then(function () {
                                lists[i].finish_type = -1;
                                _this.setData({ lists: lists });
                                var mi = _this.data.group.mission_info;
                                mi.finished_count--;
                                app.putList(_this.data.group);
                                _this.doDraw();
                            });
                        }
                        return r;
                    });
                }
                if (lists[i].finish_type != 1 && !this.data.is_admin) {
                    new Promise(function (r) {
                        wx.showModal({
                            title: "",
                            content: "确定要将此任务状态更改为已完成吗？此操作不可撤销",
                            success: r
                        });
                    }).then(function (r) {
                        if (r.confirm) {
                            return api.completeMission(lists[i]).then(function () {
                                lists[i].finish_type = 1;
                                _this.setData({ lists: lists });
                                var mi = _this.data.group.mission_info;
                                mi.personal_finished_count++;
                                mi.finished_count++;
                                app.putList(_this.data.group);
                                _this.doDraw();
                            });
                        }
                        return r;
                    });
                }
                break;
            }
        }
    },
    onDeleteCompletedMissions: function () {
        var _this = this;
        api.deleteAllDone(this.data.group)
            .then(function () {
            var lists = _this.data.lists;
            var new_list = [];
            for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
                var i = lists_1[_i];
                if (i.finish_type != 1) {
                    new_list.push(i);
                }
            }
            _this.setData({ lists: new_list });
        });
    },
    onCreateMission: function () {
        wx.navigateTo({ url: "/pages/mission-modify/mission-modify" });
    },
    doDraw: function () {
        var item = this.data.group;
        if (item.mission_info.all_count == 0) {
            return;
        }
        console.log(item);
        var round_me = new round_progress_1.RoundProgress('rp', 8);
        var round_all = new round_progress_1.RoundProgress('rp2', 8);
        round_me.precentage_from = 0;
        round_me.precentage_to
            = round_all.precentage_from
                = item.mission_info.personal_finished_count / item.mission_info.all_count * 100;
        round_all.precentage_to = item.mission_info.finished_count / item.mission_info.all_count * 100;
        round_me.color = 'green';
        round_all.color = 'red';
        console.log(round_me);
        console.log(round_all);
        round_me.draw();
        round_all.draw();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWwtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBZSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUksQ0FBQTtBQUV6QyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUNOO1FBQ0QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQXVCO1FBQWpDLGlCQVlQO1FBWEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsT0FBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ2IsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO1lBQ3BELEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNuRCxLQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQTtZQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtRQUFBLGlCQVlQ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LFNBQVMsR0FBRyxHQUFHLENBQUE7UUFFOUYsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7UUFFeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNmLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGlzdHMvZGV0YWlsLXZpZXcvZGV0YWlsLXZpZXcuanNcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gXCIuLi8uLi8uLi9hcHBcIlxuaW1wb3J0IHsgUm91bmRQcm9ncmVzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3JvdW5kX3Byb2dyZXNzJ1xuaW1wb3J0IHsgSUFwaUZhY2FkZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9hcGknXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XG52YXIgYXBpOiBJQXBpRmFjYWRlID0gYXBwLmdsb2JhbERhdGEuYXBpIVxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgZ3JvdXA6IHt9LFxuICAgIGxpc3RzOiBbXG4gICAgXSxcbiAgICBpc19hZG1pbjogdHJ1ZVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9uczogeyBpZDogc3RyaW5nIH0pIHtcbiAgICB2YXIgbGlzdCA9IGFwcC5nZXRMaXN0QnlJZCgrb3B0aW9ucy5pZClcbiAgICB0aGlzLnNldERhdGEhKHsgZ3JvdXA6IGxpc3QsIGlzX2FkbWluOiBsaXN0LmlzX2FkbWlufSwgKCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKVxuICAgICAgdGhpcy5kb0RyYXcoKVxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IGxpc3QuZ3JvdXBfbmFtZSB9KVxuICAgICAgYXBpLmdldE1pc3Npb25zKCtvcHRpb25zLmlkLCBsaXN0LmlzX2FkbWluKS50aGVuKChyKSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgbGlzdHM6IHJcbiAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdCA9IGFwcC5nZXRMaXN0QnlJZCgoPGFueT50aGlzLmRhdGEuZ3JvdXApLmdyb3VwX2lkKVxuICAgIHRoaXMuc2V0RGF0YSEoeyBncm91cDogbGlzdCwgaXNfYWRtaW46IGxpc3QuaXNfYWRtaW4gfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpXG4gICAgICB0aGlzLmRvRHJhdygpXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogbGlzdC5ncm91cF9uYW1lIH0pXG4gICAgICBhcGkuZ2V0TWlzc2lvbnMoKDxhbnk+dGhpcy5kYXRhLmdyb3VwKS5ncm91cF9pZCwgbGlzdC5pc19hZG1pbikudGhlbigocikgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICBsaXN0czogclxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vblB1bGxEb3duUmVmcmVzaCgpO1xuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goe30pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgdmFyIGxpc3RzOkFycmF5PGFueT4gPSB0aGlzLmRhdGEubGlzdHNcbiAgICBmb3IgKHZhciBpIGluIGxpc3RzKSB7XG4gICAgICBpZiAobGlzdHNbaV0ubWlzc2lvbl9pZCA9PSArZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpIHtcbiAgICAgICAgLy8gSGVyZSBpcyB0aGUgcmVhbCBsb2dpY1xuICAgICAgICBpZiAobGlzdHNbaV0uZmluaXNoX3R5cGUgPT0gMSAmJiB0aGlzLmRhdGEuaXNfYWRtaW4pIHtcbiAgICAgICAgICAvLyBIZXJlIGlzIHRoZSByZWplY3QgTG9naWNcbiAgICAgICAgICBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwi56Gu5a6a6KaB6amz5Zue5q2k5Lu75Yqh55qE5a6M5oiQ54q25oCB5ZCX77yf5q2k5pON5L2c5LiN5Y+v5pKk6ZSAXCIsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSkudGhlbigocjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoci5jb25maXJtKSB7XG4gICAgICAgICAgICAgIC8vIFJlYWwgdGhpbmdcbiAgICAgICAgICAgICAgcmV0dXJuIGFwaS5yZWplY3RNaXNzaW9uKDxhbnk+bGlzdHNbaV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3RzW2ldLmZpbmlzaF90eXBlID0gLTFcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEhKHsgbGlzdHM6IGxpc3RzIH0pXG4gICAgICAgICAgICAgICAgdmFyIG1pOiBhbnkgPSAoPGFueT50aGlzLmRhdGEuZ3JvdXApLm1pc3Npb25faW5mb1xuICAgICAgICAgICAgICAgIG1pLmZpbmlzaGVkX2NvdW50LS1cbiAgICAgICAgICAgICAgICBhcHAucHV0TGlzdCg8YW55PnRoaXMuZGF0YS5ncm91cClcbiAgICAgICAgICAgICAgICB0aGlzLmRvRHJhdygpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0c1tpXS5maW5pc2hfdHlwZSAhPSAxICYmICF0aGlzLmRhdGEuaXNfYWRtaW4pIHtcbiAgICAgICAgICAvLyBIZXJlIGlzIHRoZSBjb21wbGV0ZSBMb2dpY1xuICAgICAgICAgIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICAgICAgY29udGVudDogXCLnoa7lrpropoHlsIbmraTku7vliqHnirbmgIHmm7TmlLnkuLrlt7LlrozmiJDlkJfvvJ/mraTmk43kvZzkuI3lj6/mkqTplIBcIixcbiAgICAgICAgICAgICAgc3VjY2VzczogclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KS50aGVuKChyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChyLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgLy8gUmVhbCB0aGluZ1xuICAgICAgICAgICAgICByZXR1cm4gYXBpLmNvbXBsZXRlTWlzc2lvbig8YW55Pmxpc3RzW2ldKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0c1tpXS5maW5pc2hfdHlwZSA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEhKHsgbGlzdHM6IGxpc3RzIH0pXG4gICAgICAgICAgICAgICAgdmFyIG1pOmFueSA9ICg8YW55PnRoaXMuZGF0YS5ncm91cCkubWlzc2lvbl9pbmZvXG4gICAgICAgICAgICAgICAgbWkucGVyc29uYWxfZmluaXNoZWRfY291bnQrK1xuICAgICAgICAgICAgICAgIG1pLmZpbmlzaGVkX2NvdW50KytcbiAgICAgICAgICAgICAgICBhcHAucHV0TGlzdCg8YW55PnRoaXMuZGF0YS5ncm91cClcbiAgICAgICAgICAgICAgICB0aGlzLmRvRHJhdygpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmFsbHksIEJyZWFrIHRoZSBGT1IgbG9vcFxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9uRGVsZXRlQ29tcGxldGVkTWlzc2lvbnM6ZnVuY3Rpb24oKXtcbiAgICBhcGkuZGVsZXRlQWxsRG9uZSg8YW55PnRoaXMuZGF0YS5ncm91cClcbiAgICAudGhlbigoKT0+e1xuICAgICAgdmFyIGxpc3RzOkFycmF5PGFueT4gPSB0aGlzLmRhdGEubGlzdHNcbiAgICAgIHZhciBuZXdfbGlzdDpBcnJheTxhbnk+ID0gW11cbiAgICAgIGZvciAodmFyIGkgb2YgbGlzdHMpe1xuICAgICAgICBpZihpLmZpbmlzaF90eXBlIT0xKXtcbiAgICAgICAgICBuZXdfbGlzdC5wdXNoKGkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YSEoe2xpc3RzOiBuZXdfbGlzdH0pXG4gICAgfSlcbiAgfSxcblxuICBvbkNyZWF0ZU1pc3Npb246IGZ1bmN0aW9uICgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBcIi9wYWdlcy9taXNzaW9uLW1vZGlmeS9taXNzaW9uLW1vZGlmeVwiIH0pXG4gIH0sXG5cbiAgZG9EcmF3OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZW06YW55ID0gdGhpcy5kYXRhLmdyb3VwXG4gICAgaWYgKGl0ZW0ubWlzc2lvbl9pbmZvLmFsbF9jb3VudCA9PSAwKXsgcmV0dXJuIH1cblxuICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgLy8gUlAxOiDkuKrkurrotKHnjK7vvIzmmoLlrprnu7/oibJcbiAgICB2YXIgcm91bmRfbWUgPSBuZXcgUm91bmRQcm9ncmVzcygncnAnLCA4KVxuICAgIC8vIFJQMjog6Zmk5Liq5Lq65LmL5aSW55qE6LSh54yu77yM5pqC5a6a57qi6ImyXG4gICAgdmFyIHJvdW5kX2FsbCA9IG5ldyBSb3VuZFByb2dyZXNzKCdycDInLCA4KVxuICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfZnJvbSA9IDBcbiAgICByb3VuZF9tZS5wcmVjZW50YWdlX3RvXG4gICAgICA9IHJvdW5kX2FsbC5wcmVjZW50YWdlX2Zyb21cbiAgICAgID0gaXRlbS5taXNzaW9uX2luZm8ucGVyc29uYWxfZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25faW5mby5hbGxfY291bnQgKiAxMDBcbiAgICByb3VuZF9hbGwucHJlY2VudGFnZV90byA9IGl0ZW0ubWlzc2lvbl9pbmZvLmZpbmlzaGVkX2NvdW50IC8gaXRlbS5taXNzaW9uX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgLy8gXG4gICAgcm91bmRfbWUuY29sb3IgPSAnZ3JlZW4nXG4gICAgLy8gXG4gICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9tZSlcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9hbGwpXG4gICAgcm91bmRfbWUuZHJhdygpXG4gICAgcm91bmRfYWxsLmRyYXcoKVxuICB9XG59KSJdfQ==