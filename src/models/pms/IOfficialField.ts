import {INameId} from "../@others/INameId";

export interface IOfficialField {
    id: number;
    country: INameId;
    name: string;
    is_required: boolean;
}