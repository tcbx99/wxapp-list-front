import { IList } from '../utils/types'

export interface IApiFacade {
  login(code: string, u: wx.UserInfo): Promise<LoginResponse>
  createGroup(name: string, desc: string, gType: number): Promise<IList>
  updateGroup(list: IList): Promise<IList>
  deleteGroup(list: IList): Promise<void>
  joinGroupFlow(id: number): Promise<{ group_name: string, group_desc: string }>
  joinGroupConfirm(id: number): Promise<IList>
  getGroups(): Promise<Array<IList>>
}

interface LoginResponse {
  token: string,
  user_id: number
}

class MockApiFacade implements IApiFacade {
  dummy_group_id: number = 1
  login(): Promise<LoginResponse> {
    return new Promise<LoginResponse>((r) => { r({ token: "dummy", user_id: 1 }) })
  }
  createGroup(name: string, desc: string, gType: number): Promise<IList> {
    return new Promise<IList>((r) => {
      r({
        group_id: this.dummy_group_id++,
        group_name: name,
        group_desc: desc,
        group_type: gType,
        missions_info: {
          personal_finished_count: 0,
          finished_count: 20,
          all_count: 50
        },
        is_admin: true
      })
    })
  }
  updateGroup(list: IList): Promise<IList> {
    return new Promise<IList>((r) => {
      r(list)
    })
  }
  deleteGroup(): Promise<void> { return new Promise<void>((r) => { r() }) }
  joinGroupFlow(): Promise<{ group_name: string, group_desc: string }> {
    return new Promise((r) => {
      r({ group_name: "测试", group_desc: "某某坤就是傻逼" })
    })
  }
  joinGroupConfirm(id: number): Promise<IList> {
    return new Promise((r) => {
      r({
        group_id: id,
        group_name: "测试",
        group_desc: "某某坤就是傻逼",
        group_type: 0,
        missions_info: {
          personal_finished_count: 0,
          finished_count: 20,
          all_count: 50
        },
        is_admin: false
      })
    })
  }
  getGroups(): Promise<Array<IList>> {
    return new Promise((r) => { r([]) });
  }
}

const APP_BASE = "http://localhost:8080/"

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
      url: APP_BASE + 'createGroup' + '&user_id=' + this.user_id,
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
      url: APP_BASE + 'createGroup' + '&user_id=' + this.user_id,
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
      url: APP_BASE + 'joinGroupFlow' + '&user_id=' + this.user_id,
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
      url: APP_BASE + 'joinGroupConfirm' + '&user_id=' + this.user_id,
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
      url: APP_BASE + 'getGroups' + '&user_id=' + this.user_id,
      method: 'GET',
    }).then((r: any) => {
      return <any>r.data;
    })
  }
}

export enum ApiEnvironment { DEBUG, PROD }

export function getApiFacade(env: ApiEnvironment): IApiFacade {
  return env == ApiEnvironment.DEBUG ? new MockApiFacade() : new ApiFacade();
}