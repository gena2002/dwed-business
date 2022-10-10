import {IManufacturer} from "../admin_manufacturer/IManufacturer";
import {INameId} from "../../@others/INameId";

export interface IProduct {
    id: number;
    code: string;
    name: string;
    description: string;
    status: 0;
    manufacturer: IManufacturer;
    type: INameId;
    category: INameId;
    create_date: string;
    update_date: string;
    unit: string;
}