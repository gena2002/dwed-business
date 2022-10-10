
import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {category} from "../../endpoints/cdms";
import {ICategory} from "../../models/cdms/ICategory";

export default class Category {
    // static async get_all(
    //     limit: number | null,
    //     offset: number | null,
    //     parent: number | null,
    //     search: string | null,
    //     status: boolean | null
    // ): Promise<AxiosResponse<IListDataResponse<ICategory>>> {
    //     return await $api.get<IListDataResponse<ICategory>>(category.get_all(), {
    //         params: {
    //             limit,
    //             offset,
    //             parent,
    //             search,
    //             status
    //         }
    //     })
    // }

    // static async post(
    //     name: string,
    //     status: boolean,
    //     parent: number | null,
    //     type: number | null
    // ): Promise<AxiosResponse<ICategory>> {
    //     return await $api.post<ICategory>(category.post(), {
    //         name, status, parent, type
    //     })
    // }
    //
    // static async get(
    //     id: number,
    // ): Promise<AxiosResponse<IRegionResponse>> {
    //     return await $api.get<IRegionResponse>(admin_region.get(id))
    // }

    // static async put(
    //     id: number,
    //     name: string,
    //     status: boolean,
    //     parent: number | null,
    //     type: number | null
    // ): Promise<AxiosResponse<IRegionCreateUpdateResponse>> {
    //     return await $api.put<IRegionCreateUpdateResponse>(admin_region.put(id), {
    //         name, status, parent, type
    //     })
    // }

    // static async patch(
    //     id: number,
    //     name: string,
    //     status: boolean,
    //     parent: number | null,
    //     type: number | null
    // ): Promise<AxiosResponse<IRegionCreateUpdateResponse>> {
    //     return await $api.patch<IRegionCreateUpdateResponse>(admin_region.patch(id), {
    //         name, status, parent, type
    //     })
    // }
    //
    // static async delete(
    //     id: number,
    // ): Promise<AxiosResponse> {
    //     return await $api.delete(admin_region.delete(id))
    // }
    //
    // static async get_path(
    //     id: number,
    // ): Promise<AxiosResponse<INameId[]>> {
    //     return await $api.get<INameId[]>(admin_region.get_path(id))
    // }
}