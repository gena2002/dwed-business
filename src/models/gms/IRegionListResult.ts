import {INameId} from "../@others/INameId";

export interface IRegionListResult {
    id: number;
    name: string;
    is_parent: boolean,
    type: INameId;
}