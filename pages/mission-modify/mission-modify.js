// pages/mission-modify/mission-modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    text: null,
    checkboxItems:[
      {name: '凌子屹', value: '1'},
      {name: '朱柏锡', value: '2'},
      { name: '骈遥', value: '3' },
      { name: '徐艾辉', value: '4' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  name: function (e) {
    this.data.name = e.detail.value;
  },

  text: function (e) {
    this.data.text = e.detail.value;
  },

  create: function() {
    //console.log(this.data.name);
    //console.log(this.data.checkboxItems);
    var nameArray = new Array();
    var j=0;
    for(var i=0;i<this.data.checkboxItems.length;i++){
      if(this.data.checkboxItems[i].checked){
        nameArray[j++]=this.data.checkboxItems[i].name;
      }
    }
    var that = this;
    wx.navigateTo({
      url: '/pages/mission-modify/success?name=' + this.data.name + '&nameArray=' + nameArray,
    });
  }
})