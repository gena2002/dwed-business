import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {makeAutoObservable} from "mobx";
import AdminRegionTranslate from "../../services/gms/admin_region_translate";
import {TLang} from "../../models/@others/TLang";
import {IRegionTranslate} from "../../models/gms/IRegionTranslate";

export class AdminRegionTranslateStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка переводов региона */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IRegionTranslate>;

    private setListData(list_data: IListDataResponse<IRegionTranslate>) {
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
        region: number | null,
        search: string | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminRegionTranslate.get_all(id, lang, limit, offset, region, search);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание перевода региона */
    public readonly post_loader = new Loader(false);

    public async post(
        id: number,
        name: string,
        lang: TLang,
        region: number | null
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminRegionTranslate.post(id, name, lang, region);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение перевода региона */
    public readonly get_loader = new Loader(false);
    private data = {} as IRegionTranslate;

    private setData(data: IRegionTranslate) {
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
            const response = await AdminRegionTranslate.get(id, lang);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение перевода региона */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        lang: TLang,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminRegionTranslate.patch(id, lang);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление перевода региона */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
        lang: TLang,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminRegionTranslate.delete(id, lang);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }
}