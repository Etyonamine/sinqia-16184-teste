export interface ApiResult<T> {
  Data: T[];
  PageIndex: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
  SortColumn: string;
  SortOrder: string;
  FilterColumn: string;
  FilterQuery: string;
}
