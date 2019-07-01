"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_progress_1 = require("../../../utils/round_progress");
var app = getApp();
Page({
    data: {
        group: {},
        lists: [
            {
                id: 1,
                name: "a",
                text: "b",
                checked: false
            }
        ],
        is_admin: true
    },
    onLoad: function (options) {
        var list = app.getListById(+options.id);
        this.setData({ group: list, is_admin: list.is_admin });
        this.doDraw();
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
        var lists = this.data.lists;
        for (var i in lists) {
            if (lists[i].id == e.currentTarget.dataset.id) {
                lists[i].checked = e.detail.checked;
                break;
            }
        }
        this.setData({
            lists: lists
        });
    },
    doDraw: function () {
        var item = this.data.group;
        var round_me = new round_progress_1.RoundProgress('rp', 8);
        var round_all = new round_progress_1.RoundProgress('rp2', 8);
        round_me.precentage_from = 0;
        round_me.precentage_to
            = round_all.precentage_from
                = item.missions_info.personal_finished_count / item.missions_info.all_count * 100;
        round_all.precentage_to = item.missions_info.finished_count / item.missions_info.all_count * 100;
        round_me.color = 'green';
        round_all.color = 'red';
        console.log(round_me);
        console.log(round_all);
        round_me.draw();
        round_all.draw();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWwtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGdFQUE2RDtBQUU3RCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUU3QixJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRTtZQUNMO2dCQUNFLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxLQUFLO2FBQ2Y7U0FDRjtRQUNELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUF1QjtRQUN2QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBRUQsUUFBUSxFQUFFLFVBQVUsQ0FBTTtRQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUMzQixLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUNuQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBO2dCQUNuQyxNQUFLO2FBQ047U0FDRjtRQUNELElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNLEVBQUU7UUFDTixJQUFJLElBQUksR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUUvQixJQUFJLFFBQVEsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRXpDLElBQUksU0FBUyxHQUFHLElBQUksOEJBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0MsUUFBUSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7UUFDNUIsUUFBUSxDQUFDLGFBQWE7Y0FDbEIsU0FBUyxDQUFDLGVBQWU7a0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQ25GLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBRWhHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO1FBRXhCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2xpc3RzL2RldGFpbC12aWV3L2RldGFpbC12aWV3LmpzXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tIFwiLi4vLi4vLi4vYXBwXCJcbmltcG9ydCB7IFJvdW5kUHJvZ3Jlc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9yb3VuZF9wcm9ncmVzcydcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGdyb3VwOiB7fSxcbiAgICBsaXN0czogW1xuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgbmFtZTogXCJhXCIsXG4gICAgICAgIHRleHQ6IFwiYlwiLFxuICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgfVxuICAgIF0sXG4gICAgaXNfYWRtaW46IHRydWVcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgaWQ6IHN0cmluZyB9KSB7XG4gICAgdmFyIGxpc3QgPSBhcHAuZ2V0TGlzdEJ5SWQoK29wdGlvbnMuaWQpXG4gICAgdGhpcy5zZXREYXRhISh7IGdyb3VwOiBsaXN0LCBpc19hZG1pbjogbGlzdC5pc19hZG1pbiB9KVxuICAgIHRoaXMuZG9EcmF3KClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICB2YXIgbGlzdHMgPSB0aGlzLmRhdGEubGlzdHNcbiAgICBmb3IgKHZhciBpIGluIGxpc3RzKSB7XG4gICAgICBpZiAobGlzdHNbaV0uaWQgPT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpIHtcbiAgICAgICAgbGlzdHNbaV0uY2hlY2tlZCA9IGUuZGV0YWlsLmNoZWNrZWRcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBsaXN0czogbGlzdHNcbiAgICB9KVxuICB9LFxuXG4gIGRvRHJhdzogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVtOiBhbnkgPSB0aGlzLmRhdGEuZ3JvdXBcbiAgICAvLyBSUDE6IOS4quS6uui0oeeMru+8jOaaguWumue7v+iJslxuICAgIHZhciByb3VuZF9tZSA9IG5ldyBSb3VuZFByb2dyZXNzKCdycCcsIDgpXG4gICAgLy8gUlAyOiDpmaTkuKrkurrkuYvlpJbnmoTotKHnjK7vvIzmmoLlrprnuqLoibJcbiAgICB2YXIgcm91bmRfYWxsID0gbmV3IFJvdW5kUHJvZ3Jlc3MoJ3JwMicsIDgpXG4gICAgcm91bmRfbWUucHJlY2VudGFnZV9mcm9tID0gMFxuICAgIHJvdW5kX21lLnByZWNlbnRhZ2VfdG9cbiAgICAgID0gcm91bmRfYWxsLnByZWNlbnRhZ2VfZnJvbVxuICAgICAgPSBpdGVtLm1pc3Npb25zX2luZm8ucGVyc29uYWxfZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25zX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgcm91bmRfYWxsLnByZWNlbnRhZ2VfdG8gPSBpdGVtLm1pc3Npb25zX2luZm8uZmluaXNoZWRfY291bnQgLyBpdGVtLm1pc3Npb25zX2luZm8uYWxsX2NvdW50ICogMTAwXG4gICAgLy8gXG4gICAgcm91bmRfbWUuY29sb3IgPSAnZ3JlZW4nXG4gICAgLy8gXG4gICAgcm91bmRfYWxsLmNvbG9yID0gJ3JlZCdcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9tZSlcbiAgICBjb25zb2xlLmxvZyhyb3VuZF9hbGwpXG4gICAgcm91bmRfbWUuZHJhdygpXG4gICAgcm91bmRfYWxsLmRyYXcoKVxuICB9XG59KSJdfQ==