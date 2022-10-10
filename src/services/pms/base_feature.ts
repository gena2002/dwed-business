import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {IBaseFeature} from "../../models/pms/IBaseFeature";
import {base_feature} from "../../endpoints/pms";
import {IGetBaseFeature} from "../../models/pms/IGetBaseFeature";
import {INameId} from "../../models/@others/INameId";

export default class BaseFeature {

    static async get_all(
        limit: number | null,
        offset: number | null,
        parent: number,
        search: string | null
    ): Promise<AxiosResponse<IListDataResponse<IBaseFeature>>> {
        let _parent = isNaN(parent) ? 0 : parent;
        return await $api.get<IListDataResponse<IBaseFeature>>(base_feature.get_all(), {
            params: {
                limit,
                offset,
                parent: _parent,
                search
            }
        })
    }

    static async post(
        name: string,
        parent: number
    ): Promise<AxiosResponse<IBaseFeature>> {
        let _parent = isNaN(parent) ? null : parent;
        return await $api.post<IBaseFeature>(base_feature.post(), {
            name,
            parent: _parent,
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IGetBaseFeature>> {
        return await $api.get<IGetBaseFeature>(base_feature.get(id))
    }

    static async patch(
        id: number,
        name: string,
        parent: number
    ): Promise<AxiosResponse<IBaseFeature>> {
        let _parent = isNaN(parent) ? null : parent;
        return await $api.patch<IBaseFeature>(base_feature.patch(id), {
            name,
            parent: _parent,
        })
    }

    static async delete(
        id: number
    ): Promise<AxiosResponse> {
        return await $api.delete(base_feature.delete(id))
    }

    static async get_path(
        id: number
    ): Promise<AxiosResponse<INameId[]>> {
        return await $api.get<INameId[]>(base_feature.get_path(id))
    }

}