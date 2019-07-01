export interface IList {
  group_id: number,
  group_name: string,
  group_desc?: string,
  group_type: number,
  missions_info: {
    personal_finished_count: number,
    finished_count: number,
    all_count: number
  }
  is_admin: boolean
}

export enum MissionFinishType {
  NOT_FINISHED = 0,
  FINISHED = 1,
  PASSED = 2
}

export interface IMission {
  id: number,
  name: string,
  text?: string,
  assignee_info: {
    id: number,
    name: string,
    avatar_url: string,
  }
  finish_type: MissionFinishType
}