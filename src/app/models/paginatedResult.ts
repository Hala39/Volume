import { Pagination } from "./paginationFile";

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}