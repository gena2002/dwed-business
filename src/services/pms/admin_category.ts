import {AxiosResponse} from "axios";
import {IListDataResponse} from "../../models/@others/IListDataResponse";
import $api from "../../http";
import {IAdminCategory} from "../../models/pms/admin_category/IAdminCategory";
import {IAdminCategoryCreateUpdate} from "../../models/pms/admin_category/IAdminCategoryCreateUpdate";
import {admin_category} from "../../endpoints/pms";
import {IBindFeature} from "../../models/pms/IBindFeature";
import {INameId} from "../../models/@others/INameId";
import {TStatus} from "../../models/@others/TStatus";
import {IGetAdminCategory} from "../../models/pms/admin_category/IGetAdminCategory";

export default class AdminCategory {
    static async get_all(
        limit: number | null,
        offset: number | null,
        parent: number,
        search: string | null,
        status: TStatus | null,
    ): Promise<AxiosResponse<IListDataResponse<IAdminCategory>>> {
        let _parent = isNaN(parent) ? 0 : parent;
        return await $api.get<IListDataResponse<IAdminCategory>>(admin_category.get_all(), {
            params: {
                limit,
                offset,
                parent: _parent,
                search,
                status
            }
        })
    }

    static async post(
        name: string,
        status: TStatus,
        parent: number,
        image: string,
    ): Promise<AxiosResponse<IAdminCategoryCreateUpdate>> {
        let _parent = isNaN(parent) ? null : parent;
        return await $api.post<IAdminCategoryCreateUpdate>(admin_category.post(), {
            name,
            status,
            parent: _parent,
            image
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async get(
        id: number,
    ): Promise<AxiosResponse<IGetAdminCategory>> {
        return await $api.get<IGetAdminCategory>(admin_category.get(id))
    }

    static async patch(
        id: number,
        name: string,
        status: TStatus,
        parent: number,
        image: string | null,
    ): Promise<AxiosResponse<IAdminCategoryCreateUpdate>> {
        let _parent = isNaN(parent) ? null : parent;
        let bodyFormData = new FormData();
        if (image !== null) {
            bodyFormData.append('image', image);
        }
        bodyFormData.append('id', id.toString());
        bodyFormData.append('name', name);
        bodyFormData.append('status', status.toString());

        if (_parent !== null) {
            bodyFormData.append('parent', _parent.toString());
        }

        return await $api.patch<IAdminCategoryCreateUpdate>(admin_category.patch(id), bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async delete(
        id: number,
    ): Promise<AxiosResponse> {
        return await $api.delete(admin_category.delete(id))
    }


    static async get_path(
        id: number,
    ): Promise<AxiosResponse<INameId[]>> {
        return await $api.get<INameId[]>(admin_category.get_path(id))
    }

}