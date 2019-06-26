//app.ts
import { IList } from './utils/types'
import { ListSeeder } from './utils/testing/list_seeder'

export interface IMyApp {
  getListById(id: number): IList,
  putList(list: IList): void,
  deleteListById(id: number):void,
  userInfoReadyCallback?(res: wx.UserInfo): void
  globalData: {
    userInfo?: wx.UserInfo
    lists: Array<IList>
  }
}

var seedLine: Array<(app: IMyApp) => void> = [
  // Seed Lists
  (app) => {
    app.globalData.lists = (new ListSeeder).seedManyTimes(20)
  }
]

App<IMyApp>({
  onLaunch() {
    // Seed Everything
    for (var i in seedLine) {
      seedLine[i](this)
    }
    // 展示本地存储能力
    var logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success(_res) {
        // console.log(_res.code)
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    })
  },
  getListById(id: number): IList {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].id == id) {
        return this.globalData.lists[i]
      }
    }
    throw new Error("不存在该清单ID")
  },
  putList(list: IList) {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].id == list.id) {
        this.globalData.lists[i] = list
        return
      }
    }
    this.globalData.lists.push(list)
  },
  deleteListById(id:number):void {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].id == id) {
        this.globalData.lists.splice(+i,1)
        return
      }
    }
  },
  globalData: {
    lists: [],
    last_list_id: 21
  }
})