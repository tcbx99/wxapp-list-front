//app.ts
import { IList } from './utils/types'
import { getApiFacade, IApiFacade } from './models/api'

export interface IMyApp {
  getListById(id: number): IList,
  putList(list: IList): void,
  deleteListById(id: number): void,
  userInfoReadyCallback?(res: wx.UserInfo): void
  refreshLists(): void
  globalData: {
    api?: IApiFacade
    userInfo?: wx.UserInfo
    lists: Array<IList>
    last_list_id: number
    listUpdateCallback?: () => void
  }
}

App<IMyApp>({
  onLaunch() {
    this.globalData.api = getApiFacade()
    console.log(1)

    // 登录
    var loginCode: string;
    wx.login({
      success(_res) {
        // console.log(_res.code)
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
        loginCode = _res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
              if (loginCode) {
                // Login!
                this.globalData.api && this.globalData.api.login(loginCode, res.userInfo).then(
                  () => {
                    // Get Groups!
                    return this.globalData.api && this.globalData.api.getGroups().then((lists) => {
                      this.globalData.lists = lists
                    }).then(this.globalData.listUpdateCallback)
                  }
                )
                console.log("Logining")
              }
            }
          })
        }
      }
    })
  },
  getListById(id: number): IList {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].group_id == id) {
        return this.globalData.lists[i]
      }
    }
    throw new Error("不存在该清单ID")
  },
  putList(list: IList) {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].group_id == list.group_id) {
        this.globalData.lists[i] = list
        return
      }
    }
    this.globalData.lists.push(list)
  },
  deleteListById(id: number): void {
    for (var i in this.globalData.lists) {
      if (this.globalData.lists[i].group_id == id) {
        this.globalData.lists.splice(+i, 1)
        return
      }
    }
  },
  refreshLists(): void {
    this.globalData.api && this.globalData.api.getGroups()
      .then((r) => {
        this.globalData.lists = r
      })
      .then(this.globalData.listUpdateCallback)
  },
  globalData: {
    lists: [],
    last_list_id: 21
  }
})