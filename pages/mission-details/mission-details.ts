// pages/mission-details/mission-details.js
import {IMyApp} from '../../app'
import {IApiFacade} from '../../models/api'

var api:IApiFacade = getApp<IMyApp>().globalData.api!

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: {
      mission_id: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: string, admin: string }) {
    // Dirty Hack: Get Previous Page Data
    var pages = getCurrentPages()
    var page: any = <any>pages[pages.length - 2]
    console.log(options)
    var lists = page.data.lists
    for (var list of lists) {
      console.log(list)
      if (list.mission_id == +options.id) {
        this.setData!({ list: list, admin: options.admin == "1" ? true : false })
        break
      }
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

  onFinishMission: function () {
    // Here is the reject Logic
    new Promise((r) => {
      wx.showModal({
        title: "",
        content: "确定要将此任务状态更改为已完成吗？此操作不可撤销",
        success: r
      })
    }).then((r: any) => {
      if (r.confirm) {
        return api.completeMission(<any>this.data.list)
        .then(() => {
          // Dirty Hack: Get Previous Page Data
          var pages = getCurrentPages()
          var page: any = <any>pages[pages.length - 2]
          var lists = page.data.lists
          for (var i in lists) {
            if (lists[i].mission_id == +this.data.list.mission_id) {
              lists[i].finish_type = 1
              page.setData({ lists: lists })
              this.setData!({ list: lists[i] })
              break
            }
          }
        })
      }
      return r;
    })
  },
  onRejectMission: function () {
    // Here is the reject Logic
    new Promise((r) => {
      wx.showModal({
        title: "",
        content: "确定要驳回此任务的完成状态吗？此操作不可撤销",
        success: r
      })
    }).then((r: any) => {
      if (r.confirm) {
        return api.rejectMission(<any>this.data.list)
        .then(() => {
          // Dirty Hack: Get Previous Page Data
          var pages = getCurrentPages()
          var page: any = <any>pages[pages.length - 2]
          var lists = page.data.lists
          for (var i in lists) {
            if (lists[i].mission_id == +this.data.list.mission_id) {
              lists[i].finish_type = -1
              page.setData({ lists: lists })
              this.setData!({ list: lists[i] })
              break
            }
          }
        })
      }
      return r;
    })
  }
})