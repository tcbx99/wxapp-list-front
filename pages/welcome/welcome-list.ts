// pages/welcome/welcome-list.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    text: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: string }) {
    // Option Never Use
    console.log(options)
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
    console.log(e)
    if (e.detail.userInfo) {
      // 加入逻辑
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