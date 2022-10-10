import {TRequiredFormat} from "../@others/TRequiredFormat";
import {IAdminCategory} from "./admin_category/IAdminCategory";

export interface IFeature {
    id: number;
    name: string;
    required_format: TRequiredFormat;
    category: IAdminCategory;
    multi_values: boolean;
    required: boolean;
}