// pages/lists/index/index.js

import { RoundProgress } from '../../../utils/round_progress'
import { IList } from '../../../utils/types'
import { IMyApp } from '../../../app'
import 'wx-promise-pro'

const app = getApp<IMyApp>()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    round_progress: RoundProgress,
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getSetting({
      success: (p) => {
        if (!p.authSetting["scope.userInfo"]) {
          wx.redirectTo({
            url: '/pages/welcome/welcome-first'
          })
        } else {
          this.refreshPageData()
        }
      }, fail: () => {
        wx.redirectTo({
          url: '/pages/welcome/welcome-first'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawRoundProgresses()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshPageData()
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
   * 创建清单（群组）的回调函数
   */
  onCreateList: function () {
    wx.navigateTo({ url: '/pages/list-modify/list-modify?mode=create' })
  },

  /**
   * 清单管理员管理清单的ActionSheet调出
   */
  onShowActionSheet: function (e: any) {
    var item: IList = this.data.lists[e.currentTarget.dataset.index]
    wx.pro.showActionSheet({
      itemList: ['编辑清单', '删除清单'],
      itemColor: '#000'
    }).then((res: wx.ShowActionSheetSuccessCallbackResult) => {
      console.log(res)
      console.log(item)
      switch (res.tapIndex) {
        // 编辑
        case 0:
          wx.navigateTo({ url: '/pages/list-modify/list-modify?mode=modify&id=' + item.id })
          break
        // 删除
        case 1:
          // TODO: 友好的提示
          app.deleteListById(item.id)
          this.onShow()
          break
        default:
          console.error("触发不可能路径")
      }
    }).catch(() => { console.log("ActionSheet Canceled") })
  },

  refreshPageData: function () {
    this.setData!(
      { lists: app.globalData.lists },
      () => {
        this.drawRoundProgresses()
      })
  },

  /**
   * 绘制圆形进度条的渲染函数
   */
  drawRoundProgresses: function () {
    console.log("Start drawing canvases")
    var doDraw = function (item: IList) {
      console.log(item)
      // RP1: 个人贡献，暂定绿色
      var round_me = new RoundProgress('rp_' + item.id, 8)
      // RP2: 除个人之外的贡献，暂定红色
      var round_all = new RoundProgress('rp2_' + item.id, 8)
      round_me.precentage_from = 0
      round_me.precentage_to
        = round_all.precentage_from
        = item.items_info.personal_finished_count / item.items_info.all_count * 100
      round_all.precentage_to = item.items_info.finished_count / item.items_info.all_count * 100
      round_me.color = 'green'
      round_all.color = 'red'
      console.log(round_me)
      console.log(round_all)
      round_me.draw()
      round_all.draw()
    }
    for (var i in this.data.lists) {
      doDraw(this.data.lists[i])
      console.log('Drawing Canvas #' + i)
    }
  }
})