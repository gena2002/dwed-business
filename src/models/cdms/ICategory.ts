export interface ICategory {
    id: number;
    name: string;
    description: string;
    hide_from_orgs: boolean;
    hide_from_users: boolean;
    image: string;
    status: boolean;
    first_level_score: number;
    level_progress_by: number;
    parent: ICategory | null | number;
}