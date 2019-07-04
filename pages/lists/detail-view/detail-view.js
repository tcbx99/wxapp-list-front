"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_progress_1 = require("../../../utils/round_progress");
var app = getApp();
var api = app.globalData.api;
Page({
    data: {
        group: {},
        lists: [
            {
                mission_id: 1,
                mission_name: "a",
                mission_desc: "b",
                finish_type: 0
            }
        ],
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
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWwtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUc3RCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBZSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUksQ0FBQTtBQUV6QyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRTtZQUNMO2dCQUNFLFVBQVUsRUFBRSxDQUFDO2dCQUNiLFlBQVksRUFBRSxHQUFHO2dCQUNqQixZQUFZLEVBQUUsR0FBRztnQkFDakIsV0FBVyxFQUFFLENBQUM7YUFDZjtTQUNGO1FBQ0QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQXVCO1FBQWpDLGlCQVlQO1FBWEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsT0FBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ2IsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO1lBQ3BELEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNuRCxLQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQTtZQUNG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Q3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2xpc3RzL2RldGFpbC12aWV3L2RldGFpbC12aWV3LmpzXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tIFwiLi4vLi4vLi4vYXBwXCJcbmltcG9ydCB7IFJvdW5kUHJvZ3Jlc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9yb3VuZF9wcm9ncmVzcydcbmltcG9ydCB7IElBcGlGYWNhZGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvYXBpJ1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xudmFyIGFwaTogSUFwaUZhY2FkZSA9IGFwcC5nbG9iYWxEYXRhLmFwaSFcblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGdyb3VwOiB7fSxcbiAgICBsaXN0czogW1xuICAgICAge1xuICAgICAgICBtaXNzaW9uX2lkOiAxLFxuICAgICAgICBtaXNzaW9uX25hbWU6IFwiYVwiLFxuICAgICAgICBtaXNzaW9uX2Rlc2M6IFwiYlwiLFxuICAgICAgICBmaW5pc2hfdHlwZTogMFxuICAgICAgfVxuICAgIF0sXG4gICAgaXNfYWRtaW46IHRydWVcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgaWQ6IHN0cmluZyB9KSB7XG4gICAgdmFyIGxpc3QgPSBhcHAuZ2V0TGlzdEJ5SWQoK29wdGlvbnMuaWQpXG4gICAgdGhpcy5zZXREYXRhISh7IGdyb3VwOiBsaXN0LCBpc19hZG1pbjogbGlzdC5pc19hZG1pbn0sICgpPT57XG4gICAgICBjb25zb2xlLmxvZygnb25Mb2FkJylcbiAgICAgIHRoaXMuZG9EcmF3KClcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBsaXN0Lmdyb3VwX25hbWUgfSlcbiAgICAgIGFwaS5nZXRNaXNzaW9ucygrb3B0aW9ucy5pZCwgbGlzdC5pc19hZG1pbikudGhlbigocikgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgIGxpc3RzOiByXG4gICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICBvbkNoYW5nZTogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIHZhciBsaXN0cyA9IHRoaXMuZGF0YS5saXN0c1xuICAgIGZvciAodmFyIGkgaW4gbGlzdHMpIHtcbiAgICAgIGlmIChsaXN0c1tpXS5taXNzaW9uX2lkID09ICtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCkge1xuICAgICAgICAvLyBIZXJlIGlzIHRoZSByZWFsIGxvZ2ljXG4gICAgICAgIGlmIChsaXN0c1tpXS5maW5pc2hfdHlwZSA9PSAxICYmIHRoaXMuZGF0YS5pc19hZG1pbikge1xuICAgICAgICAgIC8vIEhlcmUgaXMgdGhlIHJlamVjdCBMb2dpY1xuICAgICAgICAgIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICAgICAgY29udGVudDogXCLnoa7lrpropoHpqbPlm57mraTku7vliqHnmoTlrozmiJDnirbmgIHlkJfvvJ/mraTmk43kvZzkuI3lj6/mkqTplIBcIixcbiAgICAgICAgICAgICAgc3VjY2VzczogclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KS50aGVuKChyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChyLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgLy8gUmVhbCB0aGluZ1xuICAgICAgICAgICAgICByZXR1cm4gYXBpLnJlamVjdE1pc3Npb24oPGFueT5saXN0c1tpXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdHNbaV0uZmluaXNoX3R5cGUgPSAtMVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0czogbGlzdHMgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RzW2ldLmZpbmlzaF90eXBlICE9IDEgJiYgIXRoaXMuZGF0YS5pc19hZG1pbikge1xuICAgICAgICAgIC8vIEhlcmUgaXMgdGhlIGNvbXBsZXRlIExvZ2ljXG4gICAgICAgICAgbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgICBjb250ZW50OiBcIuehruWumuimgeWwhuatpOS7u+WKoeeKtuaAgeabtOaUueS4uuW3suWujOaIkOWQl++8n+atpOaTjeS9nOS4jeWPr+aSpOmUgFwiLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pLnRoZW4oKHI6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHIuY29uZmlybSkge1xuICAgICAgICAgICAgICAvLyBSZWFsIHRoaW5nXG4gICAgICAgICAgICAgIHJldHVybiBhcGkuY29tcGxldGVNaXNzaW9uKDxhbnk+bGlzdHNbaV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3RzW2ldLmZpbmlzaF90eXBlID0gMVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoeyBsaXN0czogbGlzdHMgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gRmluYWxseSwgQnJlYWsgdGhlIEZPUiBsb29wXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgb25EZWxldGVDb21wbGV0ZWRNaXNzaW9uczpmdW5jdGlvbigpe1xuICAgIGFwaS5kZWxldGVBbGxEb25lKDxhbnk+dGhpcy5kYXRhLmdyb3VwKVxuICAgIC50aGVuKCgpPT57XG4gICAgICB2YXIgbGlzdHMgPSB0aGlzLmRhdGEubGlzdHNcbiAgICAgIHZhciBuZXdfbGlzdCA9IFtdXG4gICAgICBmb3IgKHZhciBpIG9mIGxpc3RzKXtcbiAgICAgICAgaWYoaS5maW5pc2hfdHlwZSE9MSl7XG4gICAgICAgICAgbmV3X2xpc3QucHVzaChpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEhKHtsaXN0czogbmV3X2xpc3R9KVxuICAgIH0pXG4gIH0sXG5cbiAgb25DcmVhdGVNaXNzaW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbWlzc2lvbi1tb2RpZnkvbWlzc2lvbi1tb2RpZnlcIiB9KVxuICB9LFxuXG4gIGRvRHJhdzogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVtOmFueSA9IHRoaXMuZGF0YS5ncm91cFxuICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgLy8gUlAxOiDkuKrkurrotKHnjK7vvIzmmoLlrprnu7/oibJcbiAgICB2YXIgcm91bmRfbWUgPSBuZXcgUm91bmRQcm9ncmVzcygncnAnLCA4KVxuICAgIC8vIFJQMjog6Zmk5Liq5Lq65LmL5aSW55qE6LSh54yu77yM5pqC5a6a57qi6ImyXG4gICAgdmFyIHJvdW5kX2FsbCA9IG5ldyBSb3VuZFByb2dyZXNzKCdycDInLCA4KVxuICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfZnJvbSA9IDBcbiAgICByb3VuZF9tZS5wcmVjZW50YWdlX3RvXG4gICAgICA9IHJvdW5kX2FsbC5wcmVjZW50YWdlX2Zyb21cbiAgICAgID0gaXRlbS5taXNzaW9uX2luZm8ucGVyc29uYWxfZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25faW5mby5hbGxfY291bnQgKiAxMDBcbiAgICByb3VuZF9hbGwucHJlY2VudGFnZV90byA9IGl0ZW0ubWlzc2lvbl9pbmZvLmZpbmlzaGVkX2NvdW50IC8gaXRlbS5taXNzaW9uX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgLy8gXG4gICAgcm91bmRfbWUuY29sb3IgPSAnZ3JlZW4nXG4gICAgLy8gXG4gICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9tZSlcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9hbGwpXG4gICAgcm91bmRfbWUuZHJhdygpXG4gICAgcm91bmRfYWxsLmRyYXcoKVxuICB9XG59KSJdfQ==