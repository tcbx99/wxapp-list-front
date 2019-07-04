// pages/welcome/welcome-list.ts
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: "",
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: string }) {
    // Option Never Use
    app.globalData.api!.joinGroupFlow(+options.id)
      .then((r) => {
        this.setData!({
          id: +options.id,
          name: r.group_name,
          text: r.group_desc
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  onGetUserInfo: function (e: any) {
    var that = this;
    console.log(e)
    if (e.detail.userInfo) {
      wx.login({
        success(_res) {
          // console.log(_res.code)
          // 发送 _res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.api!.login(_res.code, e.detail.userInfo)
            .then(() => {
              console.log("Login that: ",that)
              return app.globalData.api!.joinGroupConfirm(that.data.id)
                .then(app.putList)
                .then(() => { wx.redirectTo({ url: '/pages/lists/index/index' }) })
            })
        }
      })
    } else {
      wx.showModal({
        title: "请授权获得公开信息",
        content: "共勉需要您的公开信息才能正常使用，请再试一次",
        showCancel: false,
        confirmText: "知道了"
      })
    }
  }
})