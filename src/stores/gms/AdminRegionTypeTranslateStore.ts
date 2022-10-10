import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IRegionListResult} from "../../models/gms/IRegionListResult";
import AdminRegion from "../../services/gms/admin_region";
import {IRegionResponse} from "../../models/gms/IRegionResponse";
import {makeAutoObservable} from "mobx";
import {INameId} from "../../models/@others/INameId";
import AdminRegionTranslate from "../../services/gms/admin_region_translate";
import {TLang} from "../../models/@others/TLang";
import {IRegionTranslate} from "../../models/gms/IRegionTranslate";
import AdminRegionTypeTranslate from "../../services/gms/admin_region_type_translate";
import {IRegionTypeTranslate} from "../../models/gms/IRegionTypeTranslate";

export class AdminRegionTypeTranslateStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка переводов типа региона */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IRegionTypeTranslate>;

    private setListData(list_data: IListDataResponse<IRegionTypeTranslate>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        id: number,
        lang: TLang | null,
        limit: number | null,
        offset: number | null,
        region_type: number | null,
        search: string | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminRegionTypeTranslate.get_all(id, lang, limit, offset, region_type, search);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание перевода типа региона */
    public readonly post_loader = new Loader(false);

    public async post(
        id: number,
        name: string,
        lang: TLang,
        region_type: number | null
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminRegionTypeTranslate.post(id, name, lang, region_type);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение перевода типа региона */
    public readonly get_loader = new Loader(false);
    private data = {} as IRegionTypeTranslate;

    private setData(data: IRegionTypeTranslate) {
        this.data = data;
    }

    public getData() {
        return this.data;
    }

    public async get(
        id: number,
        lang: TLang,
    ) {
        try {
            this.get_loader.setLoading(true)
            const response = await AdminRegionTypeTranslate.get(id, lang);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение перевода типа региона */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        lang: TLang,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminRegionTypeTranslate.patch(id, lang);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление перевода типа региона */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
        lang: TLang,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminRegionTypeTranslate.delete(id, lang);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }
}