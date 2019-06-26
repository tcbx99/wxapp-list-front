export interface IList {
  id: number,
  name: string,
  text?: string,
  items_info: {
    personal_finished_count: number,
    finished_count: number,
    all_count: number
  }
  is_admin: boolean
}

export enum TaskFinishType {
  NOT_FINISHED = 0,
  FINISHED = 1,
  PASSED = 2
}

export interface ITask {
  id: number,
  name: string,
  text?: string,
  assignee_info: {
    openid: string,
    name: string,
    avatar_url: string,
  }
  finish_type: TaskFinishType
}