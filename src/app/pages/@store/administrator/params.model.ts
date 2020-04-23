export class AdministratorParamsModel {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  size: number;

  // constructor overrides
  constructor(
    filter: any,
    sortOrder= 'asc',
    sortField= '',
    pageNumber = 0,
    size = 10
  ) {
    this.filter = filter;
    this.sortOrder = sortOrder;
    this.sortField = sortField;
    this.pageNumber = pageNumber;
    this.size = size;
  }
}
