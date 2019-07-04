"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        id: 0,
        name: "",
        text: ""
    },
    onLoad: function (options) {
        var _this = this;
        app.globalData.api.joinGroupFlow(+options.id)
            .then(function (r) {
            _this.setData({
                id: +options.id,
                name: r.group_name,
                text: r.group_desc
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
    onGetUserInfo: function (e) {
        var that = this;
        console.log(e);
        if (e.detail.userInfo) {
            wx.login({
                success: function (_res) {
                    app.globalData.api.login(_res.code, e.detail.userInfo)
                        .then(function () {
                        console.log("Login that: ", that);
                        return app.globalData.api.joinGroupConfirm(that.data.id)
                            .then(app.putList)
                            .then(function () { wx.redirectTo({ url: '/pages/lists/index/index' }); });
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: "请授权获得公开信息",
                content: "共勉需要您的公开信息才能正常使用，请再试一次",
                showCancel: false,
                confirmText: "知道了"
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VsY29tZS1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxFQUFFO0tBQ1Q7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUF1QjtRQUFqQyxpQkFVUDtRQVJDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDM0MsSUFBSSxDQUFDLFVBQUMsQ0FBQztZQUNOLEtBQUksQ0FBQyxPQUFRLENBQUM7Z0JBQ1osRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxVQUFVO2dCQUNsQixJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVU7YUFDbkIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUVELGFBQWEsRUFBRSxVQUFVLENBQU07UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsT0FBTyxFQUFQLFVBQVEsSUFBSTtvQkFHVixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzt5QkFDcEQsSUFBSSxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzZCQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzs2QkFDakIsSUFBSSxDQUFDLGNBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDdkUsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxXQUFXO2dCQUNsQixPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxVQUFVLEVBQUUsS0FBSztnQkFDakIsV0FBVyxFQUFFLEtBQUs7YUFDbkIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvd2VsY29tZS93ZWxjb21lLWxpc3QudHNcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgaWQ6IDAsXG4gICAgbmFtZTogXCJcIixcbiAgICB0ZXh0OiBcIlwiXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zOiB7IGlkOiBzdHJpbmcgfSkge1xuICAgIC8vIE9wdGlvbiBOZXZlciBVc2VcbiAgICBhcHAuZ2xvYmFsRGF0YS5hcGkhLmpvaW5Hcm91cEZsb3coK29wdGlvbnMuaWQpXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICBpZDogK29wdGlvbnMuaWQsXG4gICAgICAgICAgbmFtZTogci5ncm91cF9uYW1lLFxuICAgICAgICAgIHRleHQ6IHIuZ3JvdXBfZGVzY1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgb25HZXRVc2VySW5mbzogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgd3gubG9naW4oe1xuICAgICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhfcmVzLmNvZGUpXG4gICAgICAgICAgLy8g5Y+R6YCBIF9yZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEuYXBpIS5sb2dpbihfcmVzLmNvZGUsIGUuZGV0YWlsLnVzZXJJbmZvKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIHRoYXQ6IFwiLHRoYXQpXG4gICAgICAgICAgICAgIHJldHVybiBhcHAuZ2xvYmFsRGF0YS5hcGkhLmpvaW5Hcm91cENvbmZpcm0odGhhdC5kYXRhLmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGFwcC5wdXRMaXN0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9saXN0cy9pbmRleC9pbmRleCcgfSkgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIuivt+aOiOadg+iOt+W+l+WFrOW8gOS/oeaBr1wiLFxuICAgICAgICBjb250ZW50OiBcIuWFseWLiemcgOimgeaCqOeahOWFrOW8gOS/oeaBr+aJjeiDveato+W4uOS9v+eUqO+8jOivt+WGjeivleS4gOasoVwiLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgY29uZmlybVRleHQ6IFwi55+l6YGT5LqGXCJcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSJdfQ==