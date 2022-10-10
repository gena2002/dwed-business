import {makeAutoObservable} from "mobx";
import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IOfficialField} from "../../models/pms/IOfficialField";
import AdminOfficialField from "../../services/pms/admin_official_field";


export class AdminOfficialFieldStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка OfficialField */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IOfficialField>;

    private setListData(list_data: IListDataResponse<IOfficialField>) {
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
            const response = await AdminOfficialField.get_all(limit, offset, search);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание OfficialField */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        is_required: boolean,
        country: number
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminOfficialField.post(name, is_required, country);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение OfficialField */
    public readonly get_loader = new Loader(true);
    private data = {} as IOfficialField;

    private setData(data: IOfficialField) {
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
            const response = await AdminOfficialField.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение OfficialField */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        is_required: boolean,
        country: number
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminOfficialField.patch(id, name, is_required, country);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление OfficialField */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminOfficialField.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }

}