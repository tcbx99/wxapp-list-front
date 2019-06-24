// pages/lists/index/index.js

import { RoundProgress } from '../../../utils/round_progress'
import 'wx-promise-pro'

interface IList {
  id : number,
  name : string,
  items_info : {
    personal_finished_count : number,
    finished_count : number,
    all_count : number
  }
  is_admin : boolean
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    round_progress : RoundProgress,
    lists: {
      owned: [
        
      ],
      joined: [
        
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var fin : { owned: Array<IList>, joined : Array<IList>} = { owned: [], joined: [] }
    for (var i = 1; i <= 20; i++) {
      var r1 = Math.floor (Math.random() * 20)
      var item : IList = {
        id: i,
        name: "清单" + i,
        items_info: {
          personal_finished_count: r1,
          finished_count: Math.floor (Math.random () * 30) + r1,
          all_count: 50
        },
        is_admin: Math.random () > 0.5
      }
      if (item.is_admin) {
        fin.owned.push (item)
      } else {
        fin.joined.push (item)
      }
    }
    this.setData! ({ lists: fin }, () => { this.drawRoundProgresses ()})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawRoundProgresses ()
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

  onShowActionSheet: function (e : any) {
    var item : IList = this.data.lists.owned[e.currentTarget.dataset.index]
    wx.pro.showActionSheet ({
      itemList: ['编辑任务组', '删除任务组'],
      itemColor: '#000'
      }).then ((res : wx.ShowActionSheetSuccessCallbackResult) => {
        console.log (res)
      })
  },

  drawRoundProgresses: function () {
    console.log ("Start drawing canvases")
    var doDraw = function (item : IList) {
      console.log (item)
      var round_me = new RoundProgress('rp_' + item.id, 8)
      var round_all = new RoundProgress('rp2_' + item.id, 8)
      round_me.precentage_from = 0
      round_me.precentage_to
        = round_all.precentage_from
        = item.items_info.personal_finished_count / item.items_info.all_count * 100
      round_all.precentage_to = item.items_info.finished_count / item.items_info.all_count * 100
      round_me.color = 'green'
      round_all.color = 'red'
      console.log (round_me)
      console.log (round_all)
      round_me.draw()
      round_all.draw()
    }
    for (var i in this.data.lists.owned) {
      doDraw(this.data.lists.owned[i])
      console.log ('Drawing Canvas #' + i)
    }
    for (var i in this.data.lists.joined) {
      doDraw(this.data.lists.joined[i])
      console.log('Drawing Canvas #' + i)
    }
  }
})