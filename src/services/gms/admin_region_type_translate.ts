import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {admin_region_type_translate} from "../../endpoints/gms";
import {TLang} from "../../models/@others/TLang";
import {IRegionTypeTranslate} from "../../models/gms/IRegionTypeTranslate";


export default class AdminRegionTypeTranslate {
    static async get_all(
        id: number,
        lang: TLang | null,
        limit: number | null,
        offset: number | null,
        region_type: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<IRegionTypeTranslate>>> {
        return await $api.get<IListDataResponse<IRegionTypeTranslate>>(admin_region_type_translate.get_all(id), {
            params: {
                limit,
                offset,
                region_type,
                search
            }
        })
    }

    static async post(
        id: number,
        name: string,
        lang: TLang,
        region_type: number | null
    ): Promise<AxiosResponse<IRegionTypeTranslate>> {
        return await $api.post<IRegionTypeTranslate>(admin_region_type_translate.post(id), {
            name, lang, region_type
        })
    }

    static async get(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse<IRegionTypeTranslate>> {
        return await $api.get<IRegionTypeTranslate>(admin_region_type_translate.get(id, lang))
    }

    // static async put(
    //     id: number,
    //     lang: TLang,
    // ): Promise<AxiosResponse<IRegionTypeTranslate>> {
    //     return await $api.put<IRegionTypeTranslate>(admin_region_type_translate.put(id, lang))
    // }

    static async patch(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse<IRegionTypeTranslate>> {
        return await $api.patch<IRegionTypeTranslate>(admin_region_type_translate.patch(id, lang))
    }

    static async delete(
        id: number,
        lang: TLang,
    ): Promise<AxiosResponse>{
        return await $api.patch(admin_region_type_translate.delete(id, lang))
    }
}