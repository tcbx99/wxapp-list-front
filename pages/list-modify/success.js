// pages/list-modify/success.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    text: null,
    type_name: '创建',
    is_create: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const list = app.getListById(options.id)
    this.setData({
      id: options.id,
      name: list.name,
      text: list.text
    })
    if (options.type == 'modify') {
      this.setData({
        type_name: '修改',
        is_create: false
      })
      wx.setNavigationBarTitle({
        title: '修改成功',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 分享逻辑
   */
  onShareAppMessage: function(options) {
    return {
      title: "邀请您加入" + this.data.name,
      path: "/pages/list-modify/list-modify?mode=create"
    }
  },

  /**
   * 回到主界面
   */
  onNaviBack: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})