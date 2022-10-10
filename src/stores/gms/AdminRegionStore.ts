import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IRegionListResult} from "../../models/gms/IRegionListResult";
import AdminRegion from "../../services/gms/admin_region";
import {IRegionResponse} from "../../models/gms/IRegionResponse";
import {makeAutoObservable} from "mobx";
import {INameId} from "../../models/@others/INameId";

export class AdminRegionStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка регионов */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IRegionListResult>;

    private setListData(list_data: IListDataResponse<IRegionListResult>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        limit: number | null,
        offset: number | null,
        parent: number,
        search: string | null,
        status: boolean | null
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminRegion.get_all(limit, offset, parent, search, status);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание региона */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        status: boolean,
        parent: number,
        type: number
    ) {

        try {
            this.post_loader.setLoading(true)
            return await AdminRegion.post(name, status, parent, type);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение региона */
    public readonly get_loader = new Loader(true);
    private data = {} as IRegionResponse;

    private setData(data: IRegionResponse) {
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
            const response = await AdminRegion.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение региона */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        status: boolean,
        parent: number,
        type: number
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminRegion.patch(id, name, status, parent, type);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление региона */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminRegion.delete(id);
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
            const response = await AdminRegion.get_path(id);
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