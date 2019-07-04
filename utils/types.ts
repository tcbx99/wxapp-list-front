export interface IList {
  group_id: number,
  group_name: string,
  group_desc?: string,
  group_type: number,
  mission_info: {
    personal_finished_count: number,
    finished_count: number,
    all_count: number
  }
  is_admin: boolean
}

export enum MissionFinishType {
  NOT_FINISHED = 0,
  FINISHED = 1,
  REJECTED = -1
}

export interface IMission {
  mission_id: number,
  mission_name: string,
  mission_desc?: string,
  finish_type: MissionFinishType
}