import {TLang} from "../../models/@others/TLang";
import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_region_type} from "../../endpoints/gms";
import {INameId} from "../../models/@others/INameId";

export default class AdminRegionType {
    static async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<INameId>>> {
        return await $api.get<IListDataResponse<INameId>>(admin_region_type.get_all(), {
            params: {
                limit,
                offset,
                search
            }
        })
    }

    static async post(
        name: string,
    ): Promise<AxiosResponse<INameId>> {
        return await $api.post<INameId>(admin_region_type.post(), {
            name
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<INameId>> {
        return await $api.get<INameId>(admin_region_type.get(id))
    }

    // static async put(
    //     id: number,
    //     name: string,
    // ): Promise<AxiosResponse<INameId>> {
    //     return await $api.put<INameId>(admin_region_type.put(id), {
    //         name
    //     })
    // }

    static async patch(
        id: number,
        name: string,
    ): Promise<AxiosResponse<INameId>> {
        return await $api.patch<INameId>(admin_region_type.patch(id), {
            name
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_region_type.delete(id))
    }

}