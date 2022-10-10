import {makeAutoObservable} from "mobx";
import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IFeature} from "../../models/pms/IFeature";
import {TRequiredFormat} from "../../models/@others/TRequiredFormat";
import {TStatus} from "../../models/@others/TStatus";
import {IFeatureCreateUpdate} from "../../models/pms/IFeatureCreateUpdate";
import Feature from "../../services/pms/feature";


export class FeatureStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка характеристик */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IFeature>;

    private setListData(list_data: IListDataResponse<IFeature>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        limit: number | null,
        offset: number | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await Feature.get_all(limit, offset);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание характеристики */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        required_format: TRequiredFormat,
        required: boolean,
        multi_values: boolean,
        category: number,
        prepared_values: number[],
    ) {
        try {
            this.post_loader.setLoading(true)
            return await Feature.post(name, required_format, required, multi_values, category, prepared_values);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение характеристики */
    public readonly get_loader = new Loader(true);
    private data = {} as IFeature;

    private setData(data: IFeature) {
        this.data = data;
    }

    public getData() {
        return this.data;
    }

    public async get(
        id: number,
    ) {
        try {
            this.get_loader.setLoading(true)
            const response = await Feature.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение характеристики */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        required_format: TRequiredFormat,
        required: boolean,
        multi_values: boolean,
        category: number,
        prepared_values: number[] | null,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await Feature.patch(id, name, required_format, required, multi_values, category, prepared_values);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление характеристики */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await Feature.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }

}