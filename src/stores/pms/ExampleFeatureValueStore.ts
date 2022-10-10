import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {makeAutoObservable} from "mobx";
import {IExampleFeatureValue} from "../../models/pms/IExampleFeatureValue";
import ExampleFeatureValue from "../../services/pms/example_feature_value";
import {IGetExampleFeatureValue} from "../../models/pms/IGetExampleFeatureValue";

export class ExampleFeatureValueStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IExampleFeatureValue>;

    private setListData(list_data: IListDataResponse<IExampleFeatureValue>) {
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
            const response = await ExampleFeatureValue.get_all(limit, offset);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        base_feature: number
    ) {
        try {
            this.post_loader.setLoading(true)
            return await ExampleFeatureValue.post(name, base_feature);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение по id */
    public readonly get_loader = new Loader(true);
    private data = {} as IGetExampleFeatureValue;

    private setData(data: IGetExampleFeatureValue) {
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
            const response = await ExampleFeatureValue.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        base_feature: number
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await ExampleFeatureValue.patch(id, name, base_feature);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await ExampleFeatureValue.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }

}