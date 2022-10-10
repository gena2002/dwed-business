import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {IProduct} from "../../models/pms/admin_product/IProduct";
import {admin_product} from "../../endpoints/pms";
import {ICreateProductResponse} from "../../models/pms/admin_product/ICreateProductResponse";
import {IProductImage} from "../../models/pms/admin_product/IProductImage";
import {IPostProductImage} from "../../models/pms/admin_product/IPostProductImage";
import {IPatchProductImage} from "../../models/pms/admin_product/IPatchProductImage";

export default class AdminProduct {
    static async get_all(
        limit: number | null,
        offset: number | null,
        search: string | null,
    ): Promise<AxiosResponse<IListDataResponse<IProduct>>> {
        return await $api.get<IListDataResponse<IProduct>>(admin_product.get_all(), {
            params: {
                limit,
                offset,
                search
            }
        })
    }

    static async post(
        name: string,
        description: string,
        status: number,
        manufacturer: number,
        type: number,
        category: number,
        unit: string
    ): Promise<AxiosResponse<ICreateProductResponse>> {
        let _manufacturer = isNaN(manufacturer) ? null : manufacturer;
        let _category = isNaN(category) ? null : category;
        let _type = isNaN(type) ? null : type;
        return await $api.post<ICreateProductResponse>(admin_product.post(), {
            name,
            description,
            status,
            manufacturer: _manufacturer,
            type: _type,
            category: _category,
            unit
        })
    }


    static async get(
        id: number,
    ): Promise<AxiosResponse<IProduct>> {
        return await $api.get<IProduct>(admin_product.get(id))
    }


    static async patch(
        id: number,
        name: string,
        description: string,
        status: number,
        manufacturer: number,
        type: number,
        category: number,
        unit: string
    ): Promise<AxiosResponse<ICreateProductResponse>> {
        let _manufacturer = isNaN(manufacturer) ? null : manufacturer;
        let _category = isNaN(category) ? null : category;
        let _type = isNaN(type) ? null : type;
        return await $api.patch<ICreateProductResponse>(admin_product.patch(id), {
            name,
            description,
            status,
            manufacturer: _manufacturer,
            type: _type,
            category: _category,
            unit
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_product.delete(id))
    }

    /*IMAGES*/
    static async get_all_image(
        product_id: number,
        limit: number | null,
        offset: number | null,
    ): Promise<AxiosResponse<IListDataResponse<IProductImage>>> {
        return await $api.get<IListDataResponse<IProductImage>>(admin_product.get_all_image(product_id), {
            params: {
                limit,
                offset,
            }
        })
    }

    static async post_image(
        product_id: number,
        file: string,
        status: boolean,
        main: boolean,
    ): Promise<AxiosResponse<IPostProductImage>> {
        return await $api.post<IPostProductImage>(admin_product.post_image(product_id), {
            file,
            product: product_id,
            status,
            main
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async get_image(
        product_id: number,
        id: number
    ): Promise<AxiosResponse<IProductImage>> {
        return await $api.get<IProductImage>(admin_product.get_image(product_id, id))
    }

    static async patch_image(
        product_id: number,
        id: number,
        status: boolean,
        main: boolean,
    ): Promise<AxiosResponse<IPatchProductImage>> {
        return await $api.patch<IPatchProductImage>(admin_product.patch_image(product_id, id), {
            status,
            main
        })
    }

    static async delete_image(
        product_id: number,
        id: number
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_product.delete_image(product_id, id))
    }

    /*IMAGES END*/
}