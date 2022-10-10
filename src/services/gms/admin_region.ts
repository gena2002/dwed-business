import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_region} from "../../endpoints/gms";
import {IRegionListResult} from "../../models/gms/IRegionListResult";
import {IRegionCreateUpdateResponse} from "../../models/gms/IRegionCreateUpdateResponse";
import {IRegionResponse} from "../../models/gms/IRegionResponse";
import {INameId} from "../../models/@others/INameId";

export default class AdminRegion {
    static async get_all(
        limit: number | null,
        offset: number | null,
        parent: number,
        search: string | null,
        status: boolean | null
    ): Promise<AxiosResponse<IListDataResponse<IRegionListResult>>> {
        let _parent = isNaN(parent) ? 0 : parent;
        return await $api.get<IListDataResponse<IRegionListResult>>(admin_region.get_all(), {
            params: {
                limit,
                offset,
                parent: _parent,
                search,
                status
            }
        })
    }

    static async post(
        name: string,
        status: boolean,
        parent: number,
        type: number,
    ): Promise<AxiosResponse<IRegionCreateUpdateResponse>> {
        let _parent = isNaN(parent) ? null : parent;
        let _type = isNaN(type) ? null : type;
        return await $api.post<IRegionCreateUpdateResponse>(admin_region.post(), {
            name,
            status,
            parent: _parent,
            type: _type,
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IRegionResponse>> {
        return await $api.get<IRegionResponse>(admin_region.get(id))
    }

    static async patch(
        id: number,
        name: string,
        status: boolean,
        parent: number,
        type: number
    ): Promise<AxiosResponse<IRegionCreateUpdateResponse>> {
        let _parent = isNaN(parent) ? null : parent;
        let _type = isNaN(type) ? null : type;
        return await $api.patch<IRegionCreateUpdateResponse>(admin_region.patch(id), {
            name,
            status,
            parent: _parent,
            type: _type,
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_region.delete(id))
    }

    static async get_path(
        id: number,
    ): Promise<AxiosResponse<INameId[]>> {
        return await $api.get<INameId[]>(admin_region.get_path(id))
    }
}