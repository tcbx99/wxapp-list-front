// pages/mission-modify/mission-modify.js

var api = getApp().globalData.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id: 0,
    name: "",
    text: "",
    checkboxItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // Dirty Hack: Just get privious page
    var privPages = getCurrentPages();
    var privPage = privPages[privPages.length - 2]
    // Get Group from last page
    var group = privPage.data.group
    // Members should be retrieved
    api.getMembersByGroup(group.group_id)
      .then((r) => {
        var members = []; // Here will be members
        for (var i of r) {
          members.push({
            name: i.nickname,
            value: i.member_id
          })
        }
        // Last Word: Update everything
        this.setData({
          group_id: group.group_id,
          checkboxItems: members
        })
      })

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

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
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

  name: function(e) {
    this.data.name = e.detail.value;
  },

  text: function(e) {
    this.data.text = e.detail.value;
  },

  create: function() {
    //console.log(this.data.name);
    //console.log(this.data.checkboxItems);
    var nameArray = new Array();
    var missions = []
    var j = 0;
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (this.data.checkboxItems[i].checked) {
        nameArray[j++] = this.data.checkboxItems[i].name;
        missions.push({
          member_id: +this.data.checkboxItems[i].value,
          mission_name: this.data.name,
          mission_desc: this.data.text,
          finish_type: 0
        })
      }
    }
    var that = this;
console.log("1")
    var promise = new Promise((r)=>{r()})
    var mission_finish = []
    for (var i of missions) {
      console.log(i)
      promise = promise.then(() => {
        console.log(i)
        return api.createMission(i)
      }).then((r) => {
        mission_finish.push(i)
      })
    }
    promise.then(() => {
      var privPages = getCurrentPages();
      var privPage = privPages[privPages.length - 2]
      privPage.setData({lists: privPage.data.lists.concat(mission_finish)})
      wx.redirectTo({
        url: '/pages/mission-modify/success?name=' + this.data.name + '&nameArray=' + nameArray,
      });
    }).catch(console.log)
  }
})