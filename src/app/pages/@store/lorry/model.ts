export interface LorryModel {
  id?: number;
  brand?: string;
  model?: string;
  plateNumber?: string;
  capacity?: string;
  address?: string;

  driverId?: string;
  driverFullName?: string;

  updatedById?: string;
  updatedByFullName?: string;
  updatedTime?: string;
  createdById?: string;
  createdByFullName?: string;
  createdTime?: string;
}
