import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {makeAutoObservable} from "mobx";
import {INameId} from "../../models/@others/INameId";
import AdminRegionType from "../../services/gms/admin_region_type";

export class AdminRegionTypeStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка типа регионов */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<INameId>;

    private setListData(list_data: IListDataResponse<INameId>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminRegionType.get_all(limit, offset, search);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание типа региона */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminRegionType.post(name);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение типа региона */
    public readonly get_loader = new Loader(true);
    private data = {} as INameId;

    private setData(data: INameId) {
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
            const response = await AdminRegionType.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение типа региона */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminRegionType.patch(id, name);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление типа региона */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminRegionType.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }
}