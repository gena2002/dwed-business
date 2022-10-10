import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {makeAutoObservable} from "mobx";
import {INameId} from "../../models/@others/INameId";
import {IBaseFeature} from "../../models/pms/IBaseFeature";
import BaseFeature from "../../services/pms/base_feature";
import {IGetBaseFeature} from "../../models/pms/IGetBaseFeature";

export class BaseFeatureStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IBaseFeature>;

    private setListData(list_data: IListDataResponse<IBaseFeature>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        limit: number | null,
        offset: number | null,
        parent: number,
        search: string | null
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await BaseFeature.get_all(limit, offset, parent, search);
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
        parent: number
    ) {
        try {
            this.post_loader.setLoading(true)
            return await BaseFeature.post(name, parent);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение по id */
    public readonly get_loader = new Loader(true);
    private data = {} as IGetBaseFeature;

    private setData(data: IGetBaseFeature) {
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
            const response = await BaseFeature.get(id);
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
        parent: number
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await BaseFeature.patch(id, name, parent);
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
            return await BaseFeature.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }

    /* Получение списка вложенностей */
    public readonly path_loader = new Loader(false);

    private path_data = [] as INameId[];

    private setPathData(path_data: INameId[]) {
        this.path_data = path_data;
    }

    public getPathData() {
        return this.path_data;
    }

    public async get_path(
        id: number,
    ) {
        try {
            this.path_loader.setLoading(true)
            const response = await BaseFeature.get_path(id);
            this.setPathData(response.data)
            return response;
        } catch (e: any) {
            this.setPathData([])
            return e?.response;
        } finally {
            this.path_loader.setLoading(false)
        }
    }

}