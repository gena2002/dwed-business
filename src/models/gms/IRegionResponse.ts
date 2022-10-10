import {INameId} from "../@others/INameId";

export interface IRegionResponse {
    id: number;
    name: string;
    status: boolean,
    parent: INameId,
    type: INameId;
}