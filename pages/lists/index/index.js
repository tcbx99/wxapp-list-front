"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_progress_1 = require("../../../utils/round_progress");
require("wx-promise-pro");
Page({
    data: {
        round_progress: round_progress_1.RoundProgress,
        lists: {
            owned: [],
            joined: []
        }
    },
    onLoad: function () {
        var _this = this;
        var fin = { owned: [], joined: [] };
        for (var i = 1; i <= 20; i++) {
            var r1 = Math.floor(Math.random() * 20);
            var item = {
                id: i,
                name: "清单" + i,
                items_info: {
                    personal_finished_count: r1,
                    finished_count: Math.floor(Math.random() * 30) + r1,
                    all_count: 50
                },
                is_admin: Math.random() > 0.5
            };
            if (item.is_admin) {
                fin.owned.push(item);
            }
            else {
                fin.joined.push(item);
            }
        }
        this.setData({ lists: fin }, function () { _this.drawRoundProgresses(); });
    },
    onReady: function () {
        this.drawRoundProgresses();
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
    onShowActionSheet: function (e) {
        var item = this.data.lists.owned[e.currentTarget.dataset.index];
        wx.pro.showActionSheet({
            itemList: ['编辑任务组', '删除任务组'],
            itemColor: '#000'
        }).then(function (res) {
            console.log(res);
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
        for (var i in this.data.lists.owned) {
            doDraw(this.data.lists.owned[i]);
            console.log('Drawing Canvas #' + i);
        }
        for (var i in this.data.lists.joined) {
            doDraw(this.data.lists.joined[i]);
            console.log('Drawing Canvas #' + i);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUM3RCwwQkFBdUI7QUFhdkIsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFHLDhCQUFhO1FBQzlCLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxFQUVOO1lBQ0QsTUFBTSxFQUFFLEVBRVA7U0FDRjtLQUNGO0lBS0QsTUFBTSxFQUFFO1FBQUEsaUJBcUJQO1FBcEJDLElBQUksR0FBRyxHQUFtRCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ25GLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDeEMsSUFBSSxJQUFJLEdBQVc7Z0JBQ2pCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxVQUFVLEVBQUU7b0JBQ1YsdUJBQXVCLEVBQUUsRUFBRTtvQkFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7b0JBQ3JELFNBQVMsRUFBRSxFQUFFO2lCQUNkO2dCQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFHLEdBQUcsR0FBRzthQUMvQixDQUFBO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsQ0FBQTthQUN0QjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxJ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TyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUNwQztJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9saXN0cy9pbmRleC9pbmRleC5qc1xuXG5pbXBvcnQgeyBSb3VuZFByb2dyZXNzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvcm91bmRfcHJvZ3Jlc3MnXG5pbXBvcnQgJ3d4LXByb21pc2UtcHJvJ1xuXG5pbnRlcmZhY2UgSUxpc3Qge1xuICBpZCA6IG51bWJlcixcbiAgbmFtZSA6IHN0cmluZyxcbiAgaXRlbXNfaW5mbyA6IHtcbiAgICBwZXJzb25hbF9maW5pc2hlZF9jb3VudCA6IG51bWJlcixcbiAgICBmaW5pc2hlZF9jb3VudCA6IG51bWJlcixcbiAgICBhbGxfY291bnQgOiBudW1iZXJcbiAgfVxuICBpc19hZG1pbiA6IGJvb2xlYW5cbn1cblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIHJvdW5kX3Byb2dyZXNzIDogUm91bmRQcm9ncmVzcyxcbiAgICBsaXN0czoge1xuICAgICAgb3duZWQ6IFtcbiAgICAgICAgXG4gICAgICBdLFxuICAgICAgam9pbmVkOiBbXG4gICAgICAgIFxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaW4gOiB7IG93bmVkOiBBcnJheTxJTGlzdD4sIGpvaW5lZCA6IEFycmF5PElMaXN0Pn0gPSB7IG93bmVkOiBbXSwgam9pbmVkOiBbXSB9XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMjA7IGkrKykge1xuICAgICAgdmFyIHIxID0gTWF0aC5mbG9vciAoTWF0aC5yYW5kb20oKSAqIDIwKVxuICAgICAgdmFyIGl0ZW0gOiBJTGlzdCA9IHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIG5hbWU6IFwi5riF5Y2VXCIgKyBpLFxuICAgICAgICBpdGVtc19pbmZvOiB7XG4gICAgICAgICAgcGVyc29uYWxfZmluaXNoZWRfY291bnQ6IHIxLFxuICAgICAgICAgIGZpbmlzaGVkX2NvdW50OiBNYXRoLmZsb29yIChNYXRoLnJhbmRvbSAoKSAqIDMwKSArIHIxLFxuICAgICAgICAgIGFsbF9jb3VudDogNTBcbiAgICAgICAgfSxcbiAgICAgICAgaXNfYWRtaW46IE1hdGgucmFuZG9tICgpID4gMC41XG4gICAgICB9XG4gICAgICBpZiAoaXRlbS5pc19hZG1pbikge1xuICAgICAgICBmaW4ub3duZWQucHVzaCAoaXRlbSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbi5qb2luZWQucHVzaCAoaXRlbSlcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXREYXRhISAoeyBsaXN0czogZmluIH0sICgpID0+IHsgdGhpcy5kcmF3Um91bmRQcm9ncmVzc2VzICgpfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRyYXdSb3VuZFByb2dyZXNzZXMgKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIG9uU2hvd0FjdGlvblNoZWV0OiBmdW5jdGlvbiAoZSA6IGFueSkge1xuICAgIHZhciBpdGVtIDogSUxpc3QgPSB0aGlzLmRhdGEubGlzdHMub3duZWRbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhdXG4gICAgd3gucHJvLnNob3dBY3Rpb25TaGVldCAoe1xuICAgICAgaXRlbUxpc3Q6IFsn57yW6L6R5Lu75Yqh57uEJywgJ+WIoOmZpOS7u+WKoee7hCddLFxuICAgICAgaXRlbUNvbG9yOiAnIzAwMCdcbiAgICAgIH0pLnRoZW4gKChyZXMgOiB3eC5TaG93QWN0aW9uU2hlZXRTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cgKHJlcylcbiAgICAgIH0pXG4gIH0sXG5cbiAgZHJhd1JvdW5kUHJvZ3Jlc3NlczogZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nIChcIlN0YXJ0IGRyYXdpbmcgY2FudmFzZXNcIilcbiAgICB2YXIgZG9EcmF3ID0gZnVuY3Rpb24gKGl0ZW0gOiBJTGlzdCkge1xuICAgICAgY29uc29sZS5sb2cgKGl0ZW0pXG4gICAgICB2YXIgcm91bmRfbWUgPSBuZXcgUm91bmRQcm9ncmVzcygncnBfJyArIGl0ZW0uaWQsIDgpXG4gICAgICB2YXIgcm91bmRfYWxsID0gbmV3IFJvdW5kUHJvZ3Jlc3MoJ3JwMl8nICsgaXRlbS5pZCwgOClcbiAgICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfZnJvbSA9IDBcbiAgICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfdG9cbiAgICAgICAgPSByb3VuZF9hbGwucHJlY2VudGFnZV9mcm9tXG4gICAgICAgID0gaXRlbS5pdGVtc19pbmZvLnBlcnNvbmFsX2ZpbmlzaGVkX2NvdW50IC8gaXRlbS5pdGVtc19pbmZvLmFsbF9jb3VudCAqIDEwMFxuICAgICAgcm91bmRfYWxsLnByZWNlbnRhZ2VfdG8gPSBpdGVtLml0ZW1zX2luZm8uZmluaXNoZWRfY291bnQgLyBpdGVtLml0ZW1zX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgICByb3VuZF9tZS5jb2xvciA9ICdncmVlbidcbiAgICAgIHJvdW5kX2FsbC5jb2xvciA9ICdyZWQnXG4gICAgICBjb25zb2xlLmxvZyAocm91bmRfbWUpXG4gICAgICBjb25zb2xlLmxvZyAocm91bmRfYWxsKVxuICAgICAgcm91bmRfbWUuZHJhdygpXG4gICAgICByb3VuZF9hbGwuZHJhdygpXG4gICAgfVxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5kYXRhLmxpc3RzLm93bmVkKSB7XG4gICAgICBkb0RyYXcodGhpcy5kYXRhLmxpc3RzLm93bmVkW2ldKVxuICAgICAgY29uc29sZS5sb2cgKCdEcmF3aW5nIENhbnZhcyAjJyArIGkpXG4gICAgfVxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5kYXRhLmxpc3RzLmpvaW5lZCkge1xuICAgICAgZG9EcmF3KHRoaXMuZGF0YS5saXN0cy5qb2luZWRbaV0pXG4gICAgICBjb25zb2xlLmxvZygnRHJhd2luZyBDYW52YXMgIycgKyBpKVxuICAgIH1cbiAgfVxufSkiXX0=