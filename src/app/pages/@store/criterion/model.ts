export interface CriterionModel {
  id?: number;
  uid?: string;
  name?: string;
  factor?: number;
  position?: number;
  criteriaBundleId?: number;

  isRemoved?: boolean;
  isEdited?: boolean;
  isNew?: boolean;
}
