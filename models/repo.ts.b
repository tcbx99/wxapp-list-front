import { IList, IMission } from '../utils/types'

interface ISerializedListMissions {
  list_id: number,
  list_missions: Array<IMission>
}
interface ISerializedRepository {
  lists: Array<IList>,
  missions: Array<ISerializedListMissions>
}

export class ApplicationRepository {
  lists: Array<IList> = []
  lists_missions = new Map<number, Array<IMission>>()

  getListFromId(id: number): IList {
    for (var v of this.lists) {
      if (v.id == id) { return v }
    }
    return null
  }
  putList(v: IList) {
    for (var i in this.lists) {
      if (this.lists[i].group_id == v.group_id) {
        this.lists[i] == v
        return
      }
    }
    this.lists.push(v)
  }
  getMissionsFromList(list_id: number): IMission[] {
    var r = this.lists_missions.get(list_id)
    return r ? r : [];
  }
  putMissionsForList(list_id: number, missions: IMission[]) {
    this.lists_missions.set(list_id, missions)
  }
  getMissionFromListById(list_id: number, id: number): IMission {
    var d = this.getMissionsFromList(list_id)
    for (var v of d) {
      if (v.id == id) { return v }
    }
    return null
  }
  putMissionForList(list_id: number, mission: IMission) {
    var d = this.getMissionsFromList(list_id)
    var shouldPush = true
    for (var i in d) {
      if (d[i].id == mission.id) {
        d[i] == mission
        shouldPush = false
        break
      }
      shouldPush && d.push(mission)
      this.putMissionsForList(list_id, d)
    }
  }

  /* 微信Storage作为缓存 */
  getFromCache() {
    /* 仅有任务和群组 */
    var data: ISerializedRepository = wx.getStorageSync('app_repo')
    this.lists = data.lists
    for (var item of data.missions) {
      this.lists_missions.set(item.list_id, item.list_missions)
    }
  }
  storeCache() {
    var data: ISerializedRepository = {
      lists: this.lists,
      missions: []
    }
    this.lists_missions.forEach((m: Array<IMission>, id) => { data.missions.push({ list_id: id, list_missions: m }) })
    wx.setStorageSync('app_repo', data)
  }
}