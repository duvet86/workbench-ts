export interface IPagedCollection<T> {
  Items: T[];
  PageNumber: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
}
