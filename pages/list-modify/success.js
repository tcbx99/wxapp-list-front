"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        name: null,
        text: null,
        type_name: '创建',
        is_create: true
    },
    onLoad: function (options) {
        console.log(options);
        var list = app.getListById(+options.id);
        console.log(list);
        this.setData({
            id: options.id,
            name: list.group_name,
            text: list.group_desc
        });
        if (options["type"] == 'modify') {
            this.setData({
                type_name: '修改',
                is_create: false
            });
            wx.setNavigationBarTitle({
                title: '修改成功',
            });
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
    onShareAppMessage: function () {
        return {
            title: "邀请您加入" + this.data.name,
            path: "/pages/welcome/welcome-list?id=0"
        };
    },
    onNaviBack: function () {
        wx.navigateBack({
            delta: 1
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VjY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Y2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQVk7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDdEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUN2QixLQUFLLEVBQUUsTUFBTTthQUNkLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO1FBQ2pCLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUMvQixJQUFJLEVBQUUsa0NBQWtDO1NBQ3pDLENBQUE7SUFDSCxDQUFDO0lBS0QsVUFBVSxFQUFFO1FBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogbnVsbCxcbiAgICB0ZXh0OiBudWxsLFxuICAgIHR5cGVfbmFtZTogJ+WIm+W7uicsXG4gICAgaXNfY3JlYXRlOiB0cnVlXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKVxuICAgIGNvbnN0IGxpc3QgPSBhcHAuZ2V0TGlzdEJ5SWQoK29wdGlvbnMuaWQpXG4gICAgY29uc29sZS5sb2cobGlzdClcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGlkOiBvcHRpb25zLmlkLFxuICAgICAgbmFtZTogbGlzdC5ncm91cF9uYW1lLFxuICAgICAgdGV4dDogbGlzdC5ncm91cF9kZXNjXG4gICAgfSlcbiAgICBpZiAob3B0aW9uc1tcInR5cGVcIl0gPT0gJ21vZGlmeScpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICB0eXBlX25hbWU6ICfkv67mlLknLFxuICAgICAgICBpc19jcmVhdGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDliIbkuqvpgLvovpFcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBcIumCgOivt+aCqOWKoOWFpVwiICsgdGhpcy5kYXRhLm5hbWUsXG4gICAgICBwYXRoOiBcIi9wYWdlcy93ZWxjb21lL3dlbGNvbWUtbGlzdD9pZD0wXCJcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOWbnuWIsOS4u+eVjOmdolxuICAgKi9cbiAgb25OYXZpQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICBkZWx0YTogMVxuICAgIH0pXG4gIH1cbn0pIl19