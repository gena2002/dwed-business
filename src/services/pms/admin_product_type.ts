import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {INameId} from "../../models/@others/INameId";
import $api from "../../http";
import {admin_product_type} from "../../endpoints/pms";

export default class AdminProductType {
    static async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<INameId>>> {
        return await $api.get<IListDataResponse<INameId>>(admin_product_type.get_all(), {
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
        return await $api.post<INameId>(admin_product_type.post(), {
            name
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<INameId>> {
        return await $api.get<INameId>(admin_product_type.get(id))
    }


    static async patch(
        id: number,
        name: string,
    ): Promise<AxiosResponse<INameId>> {
        return await $api.patch<INameId>(admin_product_type.patch(id), {
            name
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_product_type.delete(id))
    }

}