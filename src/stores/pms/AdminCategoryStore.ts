import {makeAutoObservable} from "mobx";
import Loader from "../@others/Loader";
import {INameId} from "../../models/@others/INameId";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IAdminCategory} from "../../models/pms/admin_category/IAdminCategory";
import AdminCategory from "../../services/pms/admin_category";
import {IGetAdminCategory} from "../../models/pms/admin_category/IGetAdminCategory";

export class AdminCategoryStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка категорий продукта */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IAdminCategory>;

    private setListData(list_data: IListDataResponse<IAdminCategory>) {
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
        status: 0 | 1 | null,
    ) {
        try {
            this.list_loader.setLoading(true)
            const response = await AdminCategory.get_all(limit, offset, parent, search, status);
            this.setListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.list_loader.setLoading(false)
        }
    }

    /* Создание категории продукта */
    public readonly post_loader = new Loader(false);

    public async post(
        name: string,
        status: 1 | 0,
        parent: number,
        image: string,
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminCategory.post(name, status, parent, image);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение категории продукта */
    public readonly get_loader = new Loader(true);
    private data = {} as IGetAdminCategory;

    private setData(data: IGetAdminCategory) {
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
            const response = await AdminCategory.get(id);
            this.setData(response.data)
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.get_loader.setLoading(false)
        }
    }

    /* Измение категории продукта */
    public readonly patch_loader = new Loader(false);

    public async patch(
        id: number,
        name: string,
        status: 1 | 0,
        parent: number,
        image: string | null,
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminCategory.patch(id, name, status, parent, image);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.patch_loader.setLoading(false)
        }
    }

    /* Удаление категории продукта */
    public readonly delete_loader = new Loader(false);

    public async delete(
        id: number,
    ) {
        try {
            this.delete_loader.setLoading(true)
            return await AdminCategory.delete(id);
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
            const response = await AdminCategory.get_path(id);
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