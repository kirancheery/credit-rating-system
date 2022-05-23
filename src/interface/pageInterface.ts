export declare interface pageRecords<T> {
  total: number;
  records: Array<T>;
}

export declare interface pageInfo {
  pageSize: number;
  pageNumber: number;
}

export declare interface records<T> {
  records: T;
}
