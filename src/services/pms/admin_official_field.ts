import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_official_field} from "../../endpoints/pms";
import {IOfficialField} from "../../models/pms/IOfficialField";


export default class AdminOfficialField {
    static async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<IOfficialField>>> {
        return await $api.get<IListDataResponse<IOfficialField>>(admin_official_field.get_all(), {
            params: {
                limit,
                offset,
                search
            }
        })
    }

    static async post(
        name: string,
        is_required: boolean,
        country: number
    ): Promise<AxiosResponse<IOfficialField>> {
        return await $api.post<IOfficialField>(admin_official_field.post(), {
            name, is_required, country
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IOfficialField>> {
        return await $api.get<IOfficialField>(admin_official_field.get(id))
    }


    static async patch(
        id: number,
        name: string,
        is_required: boolean,
        country: number
    ): Promise<AxiosResponse<IOfficialField>> {
        return await $api.patch<IOfficialField>(admin_official_field.patch(id), {
            name, is_required, country
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_official_field.delete(id))
    }
}