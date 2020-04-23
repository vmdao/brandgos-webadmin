export interface ContractorModel {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  password?: string;

  projectId?: number;
  projectName?: string;

  provinceId?: number;
  provinceName?: string;
  districtId?: number;
  districtName?: string;

  createdById?: number;
  createdByFullName?: string;
  createdTime?: string;

  updatedById?: number;
  updatedByFullName?: string;
  updatedTime?: string;
}
