import {TRequiredFormat} from "../@others/TRequiredFormat";

export interface IFeatureCreateUpdate {
    id: number;
    name: string;
    required_format: TRequiredFormat;
    required: boolean;
    multi_values: boolean;
    category: number;
    prepared_values: number[];
}