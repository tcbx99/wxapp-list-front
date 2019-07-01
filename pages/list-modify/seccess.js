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
        var list = app.getListById(options.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUtELE1BQU0sRUFBRSxVQUFTLE9BQVk7UUFDM0IsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDdEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUN2QixLQUFLLEVBQUUsTUFBTTthQUNkLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO1FBQ2pCLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUMvQixJQUFJLEVBQUUsa0NBQWtDO1NBQ3pDLENBQUE7SUFDSCxDQUFDO0lBS0QsVUFBVSxFQUFFO1FBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogbnVsbCxcbiAgICB0ZXh0OiBudWxsLFxuICAgIHR5cGVfbmFtZTogJ+WIm+W7uicsXG4gICAgaXNfY3JlYXRlOiB0cnVlXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uKG9wdGlvbnM6IGFueSkge1xuICAgIGNvbnN0IGxpc3QgPSBhcHAuZ2V0TGlzdEJ5SWQob3B0aW9ucy5pZClcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGlkOiBvcHRpb25zLmlkLFxuICAgICAgbmFtZTogbGlzdC5ncm91cF9uYW1lLFxuICAgICAgdGV4dDogbGlzdC5ncm91cF9kZXNjXG4gICAgfSlcbiAgICBpZiAob3B0aW9uc1tcInR5cGVcIl0gPT0gJ21vZGlmeScpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICB0eXBlX25hbWU6ICfkv67mlLknLFxuICAgICAgICBpc19jcmVhdGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24oKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDliIbkuqvpgLvovpFcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IFwi6YKA6K+35oKo5Yqg5YWlXCIgKyB0aGlzLmRhdGEubmFtZSxcbiAgICAgIHBhdGg6IFwiL3BhZ2VzL3dlbGNvbWUvd2VsY29tZS1saXN0P2lkPTBcIlxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog5Zue5Yiw5Li755WM6Z2iXG4gICAqL1xuICBvbk5hdmlCYWNrOiBmdW5jdGlvbigpIHtcbiAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgZGVsdGE6IDFcbiAgICB9KVxuICB9XG59KSJdfQ==