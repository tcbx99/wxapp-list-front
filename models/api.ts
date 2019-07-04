import { IList, IMission } from '../utils/types'

export interface IApiFacade {
  login(code: string, u: wx.UserInfo): Promise<LoginResponse>
  createGroup(name: string, desc: string, gType: number): Promise<IList>
  updateGroup(list: IList): Promise<IList>
  deleteGroup(list: IList): Promise<void>
  joinGroupFlow(id: number): Promise<{ group_name: string, group_desc: string }>
  joinGroupConfirm(id: number): Promise<IList>
  getGroups(): Promise<Array<IList>>
  getMembersByGroup(id: number): Promise<Array<{ member_id: number, nickname: string }>>
  createMission(mission: IMission): Promise<IMission>
  completeMission(mission: IMission): Promise<any>
  rejectMission(mission: IMission): Promise<any>
  deleteAllDone(group: IList): Promise<any>
  getMissions(group_id: number, is_admin: boolean): Promise<Array<IMission>>
}

interface LoginResponse {
  token: string,
  user_id: number
}

const APP_BASE = "https://list2-wxapp.tcbx99.cn/"

class ApiFacade implements IApiFacade {
  token = ''
  user_id = 0
  dummy_group_id: number = 1

  private promisify(f: (o: any) => any, p: any): Promise<any> {
    return new Promise((r, e) => {
      p.success = (d: any) => { r(d) }
      p.fail = (d: any) => { e(d) }
      f(p)
    })
  }

  login(code: string, u: wx.UserInfo): Promise<LoginResponse> {
    console.log("What")
    return this.promisify(wx.request, {
      url: APP_BASE + 'login',
      method: 'POST',
      data: {
        auth_code: code,
        nickname: u.nickName,
        avatar_url: u.avatarUrl,
      }
    }).then((r: any) => {
      this.token = r.data.token
      this.user_id = +r.data.user_id
      return {
        token: r.data.token,
        user_id: r.data.user_id
      }
    })
  }
  createGroup(name: string, desc: string, gType: number): Promise<IList> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'createGroup' + '?user_id=' + this.user_id,
      method: 'POST',
      data: {
        group_name: name,
        group_desc: desc,
        group_type: gType,
      }
    }).then((r: any) => {
      return <IList><any>r.data;
    })
  }
  updateGroup(list: IList): Promise<IList> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'createGroup' + '?user_id=' + this.user_id,
      method: 'POST',
      data: {
        group_name: list.group_name,
        group_desc: list.group_desc,
        group_type: list.group_type,
      }
    }).then((r: any) => {
      return <IList><any>r.data;
    })
  }
  deleteGroup(): Promise<void> { return new Promise<void>((r) => { r() }) }
  joinGroupFlow(id: number): Promise<{ group_name: string, group_desc: string }> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'joinGroupFlow' + '?user_id=' + this.user_id,
      method: 'POST',
      data: {
        group_id: id
      }
    }).then((r: any) => {
      return <any>r.data;
    })
  }
  joinGroupConfirm(id: number): Promise<IList> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'joinGroupConfirm' + '?user_id=' + this.user_id,
      method: 'POST',
      data: {
        group_id: id
      }
    }).then((r: any) => {
      return <any>r.data;
    })
  }
  getGroups(): Promise<Array<IList>> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'getGroups' + '?user_id=' + this.user_id,
      method: 'GET',
    }).then((r: any) => {
      return <any>r.data;
    })
  }
  createMission(mission: IMission): Promise<IMission> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'createMission' + '?user_id=' + this.user_id,
      method: 'POST',
      data: mission
    }).then((r: any) => {
      return <any>r.data;
    })
  }
  completeMission(mission: IMission): Promise<any> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'completeMission' + '?user_id=' + this.user_id,
      method: 'POST',
      data: mission.mission_id
    })
  }
  rejectMission(mission: IMission): Promise<any> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'rejectMission' + '?user_id=' + this.user_id,
      method: 'POST',
      data: mission.mission_id
    })
  }
  deleteAllDone(group: IList): Promise<any> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'clearMissions' + '?user_id=' + this.user_id,
      method: 'POST',
      data: group.group_id
    })
  }
  getMissions(group_id: number, is_admin: boolean): Promise<Array<IMission>> {
    if (is_admin) {
      return this.promisify(wx.request, {
        url: APP_BASE + 'getMissionsForGroup' + '?user_id=' + this.user_id,
        method: 'POST',
        data: group_id
      }).then(r=>r.data)
    } else {
      return this.promisify(wx.request, {
        url: APP_BASE + 'getMissionsForUser' + '?user_id=' + this.user_id,
        method: 'POST',
        data: group_id
      }).then(r => r.data)
    }
  }
  getMembersByGroup(id: number): Promise<Array<{ member_id: number, nickname: string }>> {
    return this.promisify(wx.request, {
      url: APP_BASE + 'getMemberByGroup' + '?user_id=' + this.user_id,
      method: 'POST',
      data: id
    }).then((r: any) => {
      return r.data
    })
  }
}


export function getApiFacade(): IApiFacade {
  return new ApiFacade();
}