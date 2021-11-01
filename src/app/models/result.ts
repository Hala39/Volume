export interface Result<T> {
    value: T;
    error?: string;
    isSuccess?: boolean;
}