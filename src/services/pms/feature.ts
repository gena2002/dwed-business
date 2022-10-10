import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {TRequiredFormat} from "../../models/@others/TRequiredFormat";
import {feature} from "../../endpoints/pms";
import {IFeature} from "../../models/pms/IFeature";
import {IFeatureCreateUpdate} from "../../models/pms/IFeatureCreateUpdate";

export default class Feature {
    static async get_all(
        limit: number | null,
        offset: number | null,
    ): Promise<AxiosResponse<IListDataResponse<IFeature>>> {
        return await $api.get<IListDataResponse<IFeature>>(feature.get_all(), {
            params: {
                limit,
                offset,
            }
        })
    }

    static async post(
        name: string,
        required_format: TRequiredFormat,
        required: boolean,
        multi_values: boolean,
        category: number,
        prepared_values: number[],
    ): Promise<AxiosResponse<IFeatureCreateUpdate>> {
        let _category = isNaN(category) ? null : category;
        return await $api.post<IFeatureCreateUpdate>(feature.post(), {
            name,
            required_format,
            required,
            multi_values,
            category: _category,
            prepared_values
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IFeature>> {
        return await $api.get<IFeature>(feature.get(id))
    }


    static async patch(
        id: number,
        name: string,
        required_format: TRequiredFormat,
        required: boolean,
        multi_values: boolean,
        category: number,
        prepared_values: number[] | null,
    ): Promise<AxiosResponse<IFeatureCreateUpdate>> {
        let _category = isNaN(category) ? null : category;
        return await $api.patch<IFeatureCreateUpdate>(feature.patch(id), {
            name,
            required_format,
            required,
            multi_values,
            category: _category,
            prepared_values
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(feature.delete(id))
    }
}