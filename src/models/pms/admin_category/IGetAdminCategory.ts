import {INameId} from "../../@others/INameId";

export interface IGetAdminCategory {
    id: number;
    name: string;
    status: 1 | 0;
    image: string;
    is_parent: boolean;
    parent: INameId;
}