// pages/list-modify/list-modify.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['工作', '学习', '家庭'],
    list: {
      id: "",
      name: "",
      text: "",
    },
    is_create: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.mode != 'create') {
      // 设置所有已设信息
      var list = app.getListById(+options.id)
      this.setData({
        list: list
      })
      wx.setNavigationBarTitle({
        title: '修改群组',
      })
    } else {
      this.setData({
        is_create: true
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  name: function(e) {
    this.data.list.name = e.detail.value;
  },

  text: function(e) {
    this.data.list.text = e.detail.value;
  },

  open: function() {
    var that = this;
    // 假的创建逻辑
    if (this.data.is_create) {
      var list = JSON.parse(JSON.stringify(app.globalData.lists[0]));
      list.name = this.data.list.name
      list.text = this.data.list.text
      list.id = app.globalData.last_list_id++
      list.is_admin = true
      this.setData({list: list});
    }
    // 修改逻辑之后
    app.putList(this.data.list)
    wx.redirectTo({
      url: '/pages/list-modify/success?id=' + that.data.list.id + '&type=' + (that.data.is_create ? 'create' : 'modify'),
    })
  }
})