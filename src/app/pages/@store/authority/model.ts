export interface AuthorityModel {
  id?: number;
  name?: string;
  code?: string;
  do?: boolean;
  appEntityId?: number;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface AuthorityPermissionsModel {
  id?: number;
  authorityId?: number;
  appEntityId?: number;
  appEntityCode?: string;
  action?: string;
}

export interface AppEntityModel {
  id?: number;
  name?: string;
  code?: string;
  className?: string;
  createdTime: string;
}
