import {makeAutoObservable} from "mobx";
import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IManufacturer} from "../../models/pms/admin_manufacturer/IManufacturer";
import AdminManufacturer from "../../services/pms/admin_manufacturer";

export class AdminManufacturerStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка производителей */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IManufacturer>;

    private setListData(list_data: IListDataResponse<IManufacturer>) {
        this.list_data = list_data;
    }

    public getListData() {
        return this.list_data;
    }

    public async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
        org: string | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminManufacturer.get_all(limit, offset, search, org);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание производителей */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        org: string | null,
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminManufacturer.post(name, org);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение производителя */
    public readonly get_loader = new Loader(true);
    private data = {} as IManufacturer;

    private setData(data: IManufacturer) {
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
            const response = await AdminManufacturer.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение производителя */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        org: string | null,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminManufacturer.patch(id, name, org);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление производителя */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminManufacturer.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }
}