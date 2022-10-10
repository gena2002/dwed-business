export interface IAdminCategoryCreateUpdate {
    id: number;
    name: string;
    status: 1 | 0;
    image: string;
    parent: number;
}