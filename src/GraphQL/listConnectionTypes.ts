export interface ListEdge<T> {
  edge: T;
}

export interface ListConnection<T> {
  list: Array<T>;
  page: number;
  pageSize: number;
  count: number;
}
