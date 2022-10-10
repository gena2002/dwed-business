export interface IListDataResponse<T = any> {
    count: number;
    next: string;
    previous: string;
    next_offset: number;
    previous_offset: number;
    results: T[];
}