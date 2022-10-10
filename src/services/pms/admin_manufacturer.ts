import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_manufacturer} from "../../endpoints/pms";
import {IManufacturer} from "../../models/pms/admin_manufacturer/IManufacturer";

export default class AdminManufacturer {
    static async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
        org: string | null,
    ): Promise<AxiosResponse<IListDataResponse<IManufacturer>>> {
        return await $api.get<IListDataResponse<IManufacturer>>(admin_manufacturer.get_all(), {
            params: {
                limit,
                offset,
                org,
                search
            }
        })
    }

    static async post(
        name: string,
        org: string | null,
    ): Promise<AxiosResponse<IManufacturer>> {
        return await $api.post<IManufacturer>(admin_manufacturer.post(), {
            name, org
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IManufacturer>> {
        return await $api.get<IManufacturer>(admin_manufacturer.get(id))
    }


    static async patch(
        id: number,
        name: string,
        org: string | null,
    ): Promise<AxiosResponse<IManufacturer>> {
        return await $api.patch<IManufacturer>(admin_manufacturer.patch(id), {
            name, org
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_manufacturer.delete(id))
    }
}