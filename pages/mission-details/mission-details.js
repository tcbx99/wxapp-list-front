"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api = getApp().globalData.api;
Page({
    data: {
        list: {
            mission_id: 0
        }
    },
    onLoad: function (options) {
        var pages = getCurrentPages();
        var page = pages[pages.length - 2];
        console.log(options);
        var lists = page.data.lists;
        for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
            var list = lists_1[_i];
            console.log(list);
            if (list.mission_id == +options.id) {
                this.setData({ list: list, admin: options.admin == "1" ? true : false });
                break;
            }
        }
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onFinishMission: function () {
        var _this = this;
        new Promise(function (r) {
            wx.showModal({
                title: "",
                content: "确定要将此任务状态更改为已完成吗？此操作不可撤销",
                success: r
            });
        }).then(function (r) {
            if (r.confirm) {
                return api.completeMission(_this.data.list)
                    .then(function () {
                    var pages = getCurrentPages();
                    var page = pages[pages.length - 2];
                    var lists = page.data.lists;
                    for (var i in lists) {
                        if (lists[i].mission_id == +_this.data.list.mission_id) {
                            lists[i].finish_type = 1;
                            page.setData({ lists: lists });
                            _this.setData({ list: lists[i] });
                            break;
                        }
                    }
                });
            }
            return r;
        });
    },
    onRejectMission: function () {
        var _this = this;
        new Promise(function (r) {
            wx.showModal({
                title: "",
                content: "确定要驳回此任务的完成状态吗？此操作不可撤销",
                success: r
            });
        }).then(function (r) {
            if (r.confirm) {
                return api.rejectMission(_this.data.list)
                    .then(function () {
                    var pages = getCurrentPages();
                    var page = pages[pages.length - 2];
                    var lists = page.data.lists;
                    for (var i in lists) {
                        if (lists[i].mission_id == +_this.data.list.mission_id) {
                            lists[i].finish_type = -1;
                            page.setData({ lists: lists });
                            _this.setData({ list: lists[i] });
                            break;
                        }
                    }
                });
            }
            return r;
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2lvbi1kZXRhaWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWlzc2lvbi1kZXRhaWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBSSxHQUFHLEdBQWMsTUFBTSxFQUFVLENBQUMsVUFBVSxDQUFDLEdBQUksQ0FBQTtBQUVyRCxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUU7WUFDSixVQUFVLEVBQUUsQ0FBQztTQUNkO0tBQ0Y7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFzQztRQUV0RCxJQUFJLEtBQUssR0FBRyxlQUFlLEVBQUUsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBYSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQzNCLEtBQWlCLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQUU7WUFBbkIsSUFBSSxJQUFJLGNBQUE7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUN6RSxNQUFLO2FBQ047U0FDRjtJQUNILENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7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QUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL21pc3Npb24tZGV0YWlscy9taXNzaW9uLWRldGFpbHMuanNcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi9hcHAnXG5pbXBvcnQge0lBcGlGYWNhZGV9IGZyb20gJy4uLy4uL21vZGVscy9hcGknXG5cbnZhciBhcGk6SUFwaUZhY2FkZSA9IGdldEFwcDxJTXlBcHA+KCkuZ2xvYmFsRGF0YS5hcGkhXG5cblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbGlzdDoge1xuICAgICAgbWlzc2lvbl9pZDogMFxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgaWQ6IHN0cmluZywgYWRtaW46IHN0cmluZyB9KSB7XG4gICAgLy8gRGlydHkgSGFjazogR2V0IFByZXZpb3VzIFBhZ2UgRGF0YVxuICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgdmFyIHBhZ2U6IGFueSA9IDxhbnk+cGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKVxuICAgIHZhciBsaXN0cyA9IHBhZ2UuZGF0YS5saXN0c1xuICAgIGZvciAodmFyIGxpc3Qgb2YgbGlzdHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKGxpc3QpXG4gICAgICBpZiAobGlzdC5taXNzaW9uX2lkID09ICtvcHRpb25zLmlkKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0OiBsaXN0LCBhZG1pbjogb3B0aW9ucy5hZG1pbiA9PSBcIjFcIiA/IHRydWUgOiBmYWxzZSB9KVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgb25GaW5pc2hNaXNzaW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gSGVyZSBpcyB0aGUgcmVqZWN0IExvZ2ljXG4gICAgbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBjb250ZW50OiBcIuehruWumuimgeWwhuatpOS7u+WKoeeKtuaAgeabtOaUueS4uuW3suWujOaIkOWQl++8n+atpOaTjeS9nOS4jeWPr+aSpOmUgFwiLFxuICAgICAgICBzdWNjZXNzOiByXG4gICAgICB9KVxuICAgIH0pLnRoZW4oKHI6IGFueSkgPT4ge1xuICAgICAgaWYgKHIuY29uZmlybSkge1xuICAgICAgICByZXR1cm4gYXBpLmNvbXBsZXRlTWlzc2lvbig8YW55PnRoaXMuZGF0YS5saXN0KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgLy8gRGlydHkgSGFjazogR2V0IFByZXZpb3VzIFBhZ2UgRGF0YVxuICAgICAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgdmFyIHBhZ2U6IGFueSA9IDxhbnk+cGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgICB2YXIgbGlzdHMgPSBwYWdlLmRhdGEubGlzdHNcbiAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3RzKSB7XG4gICAgICAgICAgICBpZiAobGlzdHNbaV0ubWlzc2lvbl9pZCA9PSArdGhpcy5kYXRhLmxpc3QubWlzc2lvbl9pZCkge1xuICAgICAgICAgICAgICBsaXN0c1tpXS5maW5pc2hfdHlwZSA9IDFcbiAgICAgICAgICAgICAgcGFnZS5zZXREYXRhKHsgbGlzdHM6IGxpc3RzIH0pXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0OiBsaXN0c1tpXSB9KVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0pXG4gIH0sXG4gIG9uUmVqZWN0TWlzc2lvbjogZnVuY3Rpb24gKCkge1xuICAgIC8vIEhlcmUgaXMgdGhlIHJlamVjdCBMb2dpY1xuICAgIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgY29udGVudDogXCLnoa7lrpropoHpqbPlm57mraTku7vliqHnmoTlrozmiJDnirbmgIHlkJfvvJ/mraTmk43kvZzkuI3lj6/mkqTplIBcIixcbiAgICAgICAgc3VjY2VzczogclxuICAgICAgfSlcbiAgICB9KS50aGVuKChyOiBhbnkpID0+IHtcbiAgICAgIGlmIChyLmNvbmZpcm0pIHtcbiAgICAgICAgcmV0dXJuIGFwaS5yZWplY3RNaXNzaW9uKDxhbnk+dGhpcy5kYXRhLmxpc3QpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyBEaXJ0eSBIYWNrOiBHZXQgUHJldmlvdXMgUGFnZSBEYXRhXG4gICAgICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgICB2YXIgcGFnZTogYW55ID0gPGFueT5wYWdlc1twYWdlcy5sZW5ndGggLSAyXVxuICAgICAgICAgIHZhciBsaXN0cyA9IHBhZ2UuZGF0YS5saXN0c1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gbGlzdHMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0c1tpXS5taXNzaW9uX2lkID09ICt0aGlzLmRhdGEubGlzdC5taXNzaW9uX2lkKSB7XG4gICAgICAgICAgICAgIGxpc3RzW2ldLmZpbmlzaF90eXBlID0gLTFcbiAgICAgICAgICAgICAgcGFnZS5zZXREYXRhKHsgbGlzdHM6IGxpc3RzIH0pXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0OiBsaXN0c1tpXSB9KVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0pXG4gIH1cbn0pIl19