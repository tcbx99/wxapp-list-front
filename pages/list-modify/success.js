"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        id: 0,
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
            path: "/pages/welcome/welcome-list?id=" + this.data.id
        };
    },
    onNaviBack: function () {
        wx.navigateBack({
            delta: 1
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VjY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Y2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUMsQ0FBQztRQUNKLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBS0QsTUFBTSxFQUFFLFVBQVUsT0FBWTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtTQUN0QixDQUFDLENBQUE7UUFDRixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQVEsQ0FBQztnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUE7WUFDRixFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7UUFDakIsT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQy9CLElBQUksRUFBRSxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FDdkQsQ0FBQTtJQUNILENBQUM7SUFLRCxVQUFVLEVBQUU7UUFDVixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5cblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBpZDowLFxuICAgIG5hbWU6IG51bGwsXG4gICAgdGV4dDogbnVsbCxcbiAgICB0eXBlX25hbWU6ICfliJvlu7onLFxuICAgIGlzX2NyZWF0ZTogdHJ1ZVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9uczogYW55KSB7XG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcbiAgICBjb25zdCBsaXN0ID0gYXBwLmdldExpc3RCeUlkKCtvcHRpb25zLmlkKVxuICAgIGNvbnNvbGUubG9nKGxpc3QpXG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBpZDogb3B0aW9ucy5pZCxcbiAgICAgIG5hbWU6IGxpc3QuZ3JvdXBfbmFtZSxcbiAgICAgIHRleHQ6IGxpc3QuZ3JvdXBfZGVzY1xuICAgIH0pXG4gICAgaWYgKG9wdGlvbnNbXCJ0eXBlXCJdID09ICdtb2RpZnknKSB7XG4gICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgdHlwZV9uYW1lOiAn5L+u5pS5JyxcbiAgICAgICAgaXNfY3JlYXRlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJyxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog5YiG5Lqr6YC76L6RXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogXCLpgoDor7fmgqjliqDlhaVcIiArIHRoaXMuZGF0YS5uYW1lLFxuICAgICAgcGF0aDogXCIvcGFnZXMvd2VsY29tZS93ZWxjb21lLWxpc3Q/aWQ9XCIgKyB0aGlzLmRhdGEuaWRcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOWbnuWIsOS4u+eVjOmdolxuICAgKi9cbiAgb25OYXZpQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICBkZWx0YTogMVxuICAgIH0pXG4gIH1cbn0pIl19