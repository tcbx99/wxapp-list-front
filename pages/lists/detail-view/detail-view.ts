// pages/lists/detail-view/detail-view.js
import { IMyApp } from "../../../app"
import { RoundProgress } from '../../../utils/round_progress'

const app = getApp<IMyApp>();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: {},
    lists: [
      {
        id: 1,
        name: "a",
        text: "b",
        checked: false
      }
    ],
    is_admin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: string }) {
    var list = app.getListById(+options.id)
    this.setData!({ group: list, is_admin: list.is_admin })
    this.doDraw()
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

  onChange: function (e: any) {
    var lists = this.data.lists
    for (var i in lists) {
      if (lists[i].id == e.currentTarget.dataset.id) {
        lists[i].checked = e.detail.checked
        break
      }
    }
    this.setData!({
      lists: lists
    })
  },

  doDraw: function () {
    var item: any = this.data.group
    // RP1: 个人贡献，暂定绿色
    var round_me = new RoundProgress('rp', 8)
    // RP2: 除个人之外的贡献，暂定红色
    var round_all = new RoundProgress('rp2', 8)
    round_me.precentage_from = 0
    round_me.precentage_to
      = round_all.precentage_from
      = item.missions_info.personal_finished_count / item.missions_info.all_count * 100
    round_all.precentage_to = item.missions_info.finished_count / item.missions_info.all_count * 100
    // 
    round_me.color = 'green'
    // 
    round_all.color = 'red'
    console.log(round_me)
    console.log(round_all)
    round_me.draw()
    round_all.draw()
  }
})