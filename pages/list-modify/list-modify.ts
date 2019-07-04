// pages/list-modify/list-modify.js
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['工作', '学习', '家庭'],
    list: {
      group_id: 0,
      group_name: "",
      group_desc: "",
      group_type: 0,
      missions_info: {
        personal_finished_count: 0,
        finished_count: 0,
        all_count: 0
      },
      is_admin: false
    },
    is_create: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: any) {
    if (options.mode != 'create') {
      // 设置所有已设信息
      var list = app.getListById(+options.id)
      this.setData!({
        list: list
      })
      wx.setNavigationBarTitle({
        title: '修改群组',
      })
    } else {
      this.setData!({
        is_create: true
      })
    }
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

  name: function (e: any) {
    this.data.list.group_name = e.detail.value;
  },

  text: function (e: any) {
    this.data.list.group_desc = e.detail.value;
  },

  bindPickerChange(e:any){
    console.log(e)
    this.setData!({
      list: {
        group_type: +e.detail.value
      }
    })
  },

  open: function () {
    var that = this;
    // Filter
    if (!this.data.list.group_name) {
      return wx.showModal({
        title: "输入错误",
        content: "群组名称不能为空",
        showCancel: false
      })
    } else if (this.data.list.group_name.length > 30) {
      return wx.showModal({
        title: "输入错误",
        content: "群组名称不得多于30字符",
        showCancel: false
      })
    } else if (this.data.list.group_desc.length > 300) {
      return wx.showModal({
        title: "输入错误",
        content: "群组介绍不得多于300字符",
        showCancel: false
      })
    }
    var promise: Promise<any>;
    // 假的创建逻辑
    if (this.data.is_create) {
      /*var list = JSON.parse(JSON.stringify(app.globalData.lists[0]));
      list.name = this.data.list.group_name
      list.text = this.data.list.group_desc
      list.id = app.globalData.last_list_id++
      list.is_admin = true
      this.setData!({ list: list });*/
      promise = app.globalData.api!.createGroup(this.data.list.group_name, this.data.list.group_desc, this.data.list.group_type).then((r)=>{this.data.list.group_id = r.group_id;return r})
    } else {
      promise = app.globalData.api!.updateGroup(<any>this.data.list)
    }
    // 修改逻辑之后
    promise.then(app.putList)
      .then(() => {
        wx.redirectTo({
          url: '/pages/list-modify/success?id=' + that.data.list.group_id + '&type=' + (that.data.is_create ? 'create' : 'modify'),
        })
      })
  }
})