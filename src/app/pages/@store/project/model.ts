export enum TeamWorkingStatus {
  IDLE = 'idle',
  WORKING = 'working',
}
export interface ProjectModel {
  id?: number;
  fullName?: string;
  address?: string;
  lineId?: string;
  email?: string;
  avatarExtId?: string;
  avatarUrl?: string;
  phone?: string;
  phone2?: string;
  password?: string;
  lorryId?: number;
  lorryPlateNumber?: string;
  tripId?: number;
  tripName?: string;
  workingStatus?: TeamWorkingStatus;
}
