export class TemplateParamsModel {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  count?: number;

  // constructor overrides
  constructor(
    filter: any,
    sortOrder = 'ASC',
    sortField = '',
    pageNumber = 0,
    size = 10
  ) {
    this.filter = filter;
    this.sortOrder = sortOrder;
    this.sortField = sortField;
    this.pageNumber = pageNumber;
  }
}
