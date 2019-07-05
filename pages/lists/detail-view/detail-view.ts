// pages/lists/detail-view/detail-view.js
import { IMyApp } from "../../../app"
import { RoundProgress } from '../../../utils/round_progress'
import { IApiFacade } from '../../../models/api'

const app = getApp<IMyApp>();
var api: IApiFacade = app.globalData.api!

Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: {},
    lists: [
    ],
    is_admin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: string }) {
    var list = app.getListById(+options.id)
    this.setData!({ group: list, is_admin: list.is_admin}, ()=>{
      console.log('onLoad')
      this.doDraw()
      wx.setNavigationBarTitle({ title: list.group_name })
      api.getMissions(+options.id, list.is_admin).then((r) => {
      this.setData!({
        lists: r
      })
      })
    })
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
    var list = app.getListById((<any>this.data.group).group_id)
    this.setData!({ group: list, is_admin: list.is_admin }, () => {
      console.log('onLoad')
      this.doDraw()
      wx.setNavigationBarTitle({ title: list.group_name })
      api.getMissions((<any>this.data.group).group_id, list.is_admin).then((r) => {
        this.setData!({
          lists: r
        })
      })
    })
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
    this.onPullDownRefresh();
    wx.stopPullDownRefresh({});
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onChange: function (e: any) {
    console.log(e);
    var lists:Array<any> = this.data.lists
    for (var i in lists) {
      if (lists[i].mission_id == +e.currentTarget.dataset.id) {
        // Here is the real logic
        if (lists[i].finish_type == 1 && this.data.is_admin) {
          // Here is the reject Logic
          new Promise((r) => {
            wx.showModal({
              title: "",
              content: "确定要驳回此任务的完成状态吗？此操作不可撤销",
              success: r
            })
          }).then((r: any) => {
            if (r.confirm) {
              // Real thing
              return api.rejectMission(<any>lists[i]).then(() => {
                lists[i].finish_type = -1
                this.setData!({ lists: lists })
                var mi: any = (<any>this.data.group).mission_info
                mi.finished_count--
                app.putList(<any>this.data.group)
                this.doDraw()
              })
            }
            return r;
          })
        }
        if (lists[i].finish_type != 1 && !this.data.is_admin) {
          // Here is the complete Logic
          new Promise((r) => {
            wx.showModal({
              title: "",
              content: "确定要将此任务状态更改为已完成吗？此操作不可撤销",
              success: r
            })
          }).then((r: any) => {
            if (r.confirm) {
              // Real thing
              return api.completeMission(<any>lists[i]).then(() => {
                lists[i].finish_type = 1
                this.setData!({ lists: lists })
                var mi:any = (<any>this.data.group).mission_info
                mi.personal_finished_count++
                mi.finished_count++
                app.putList(<any>this.data.group)
                this.doDraw()
              })
            }
            return r;
          })
        }
        // Finally, Break the FOR loop
        break;
      }
    }
  },
  onDeleteCompletedMissions:function(){
    api.deleteAllDone(<any>this.data.group)
    .then(()=>{
      var lists:Array<any> = this.data.lists
      var new_list:Array<any> = []
      for (var i of lists){
        if(i.finish_type!=1){
          new_list.push(i)
        }
      }
      this.setData!({lists: new_list})
    })
  },

  onCreateMission: function () {
    wx.navigateTo({ url: "/pages/mission-modify/mission-modify" })
  },

  doDraw: function () {
    var item:any = this.data.group
    if (item.mission_info.all_count == 0){ return }

    console.log(item)
    // RP1: 个人贡献，暂定绿色
    var round_me = new RoundProgress('rp', 8)
    // RP2: 除个人之外的贡献，暂定红色
    var round_all = new RoundProgress('rp2', 8)
    round_me.precentage_from = 0
    round_me.precentage_to
      = round_all.precentage_from
      = item.mission_info.personal_finished_count / item.mission_info.all_count * 100
    round_all.precentage_to = item.mission_info.finished_count / item.mission_info.all_count * 100
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