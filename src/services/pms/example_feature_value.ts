import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {IExampleFeatureValue} from "../../models/pms/IExampleFeatureValue";
import {example_feature_value} from "../../endpoints/pms";
import {IGetExampleFeatureValue} from "../../models/pms/IGetExampleFeatureValue";

export default class ExampleFeatureValue {

    static async get_all(
        limit: number | null,
        offset: number | null,
    ): Promise<AxiosResponse<IListDataResponse<IExampleFeatureValue>>> {
        return await $api.get<IListDataResponse<IExampleFeatureValue>>(example_feature_value.get_all(), {
            params: {
                limit,
                offset
            }
        })
    }

    static async post(
        name: string,
        base_feature: number
    ): Promise<AxiosResponse<IExampleFeatureValue>> {
        let _base_feature = isNaN(base_feature) ? null : base_feature;
        return await $api.post<IExampleFeatureValue>(example_feature_value.post(), {
            name,
            base_feature: _base_feature,
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IGetExampleFeatureValue>> {
        return await $api.get<IGetExampleFeatureValue>(example_feature_value.get(id))
    }

    static async patch(
        id: number,
        name: string,
        base_feature: number
    ): Promise<AxiosResponse<IExampleFeatureValue>> {
        let _base_feature = isNaN(base_feature) ? null : base_feature;
        return await $api.patch<IExampleFeatureValue>(example_feature_value.patch(id), {
            name,
            base_feature: _base_feature,
        })
    }

    static async delete(
        id: number
    ): Promise<AxiosResponse> {
        return await $api.delete(example_feature_value.delete(id))
    }

}