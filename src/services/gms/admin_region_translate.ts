import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_region_translate} from "../../endpoints/gms";
import {TLang} from "../../models/@others/TLang";
import {IRegionTranslate} from "../../models/gms/IRegionTranslate";

export default class AdminRegionTranslate {
    static async get_all(
        id: number,
        lang: TLang | null,
        limit: number | null,
        offset: number | null,
        region: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<IRegionTranslate>>> {
        return await $api.get<IListDataResponse<IRegionTranslate>>(admin_region_translate.get_all(id), {
            params: {
                limit,
                offset,
                region,
                search
            }
        })
    }

    static async post(
        id: number,
        name: string,
        lang: TLang,
        region: number | null
    ): Promise<AxiosResponse<IRegionTranslate>> {
        return await $api.post<IRegionTranslate>(admin_region_translate.post(id), {
            name, lang, region
        })
    }

    static async get(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse<IRegionTranslate>> {
        return await $api.get<IRegionTranslate>(admin_region_translate.get(id, lang))
    }

    // static async put(
    //     id: number,
    //     lang: TLang,
    // ): Promise<AxiosResponse<IRegionTranslate>> {
    //     return await $api.put<IRegionTranslate>(admin_region_translate.put(id, lang))
    // }

    static async patch(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse<IRegionTranslate>> {
        return await $api.patch<IRegionTranslate>(admin_region_translate.patch(id, lang))
    }

    static async delete(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse>{
        return await $api.patch(admin_region_translate.delete(id, lang))
    }
}