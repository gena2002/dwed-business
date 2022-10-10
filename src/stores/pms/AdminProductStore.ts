import {makeAutoObservable} from "mobx";
import Loader from "../@others/Loader";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import {IProduct} from "../../models/pms/admin_product/IProduct";
import AdminProduct from "../../services/pms/admin_product";
import AdminProductType from "../../services/pms/admin_product_type";
import {INameId} from "../../models/@others/INameId";
import {IProductImage} from "../../models/pms/admin_product/IProductImage";


export class AdminProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    /* Получение списка */
    public readonly list_loader = new Loader(true);
    private list_data = {} as IListDataResponse<IProduct>;

    private setListData(list_data: IListDataResponse<IProduct>) {
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
            const response = await AdminProduct.get_all(limit, offset, search);
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
        description: string,
        status: number,
        manufacturer: number,
        type: number,
        category: number,
        unit: string
    ) {
        try {
            this.post_loader.setLoading(true)
            return await AdminProduct.post(name, description, status, manufacturer, type, category, unit);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.post_loader.setLoading(false)
        }
    }

    /* Получение типа товара */
    public readonly get_loader = new Loader(true);
    private data = {} as IProduct;

    private setData(data: IProduct) {
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
            const response = await AdminProduct.get(id);
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
        description: string,
        status: number,
        manufacturer: number,
        type: number,
        category: number,
        unit: string
    ) {
        try {
            this.patch_loader.setLoading(true)
            return await AdminProduct.patch(id, name, description, status, manufacturer, type, category, unit);
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
            return await AdminProduct.delete(id);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.delete_loader.setLoading(false)
        }
    }

    /* Получение списка изображений */
    public readonly image_list_loader = new Loader(true);
    private image_list_data = {} as IListDataResponse<IProductImage>;

    private setImageListData(list_data: IListDataResponse<IProductImage>) {
        this.image_list_data = list_data;
    }

    public getImageListData() {
        return this.image_list_data;
    }

    public async get_all_image(
        product_id: number,
        limit: number | null,
        offset: number | null,
    ) {
        try {
            this.image_list_loader.setLoading(true)
            const response = await AdminProduct.get_all_image(product_id, limit, offset);
            this.setImageListData(response.data);
            return response;
        } catch (e: any) {
            return e?.response;
        } finally {
            this.image_list_loader.setLoading(false)
        }
    }

    /* Загрузка изображения */
    public readonly image_post_loader = new Loader(false);

    public async post_image(
        product_id: number,
        file: string,
        status: boolean,
        main: boolean,
    ) {
        try {
            this.image_post_loader.setLoading(true)
            return await AdminProduct.post_image(product_id, file, status, main);
        } catch (e: any) {
            return e?.response;
        } finally {
            this.image_post_loader.setLoading(false)
        }
    }


}