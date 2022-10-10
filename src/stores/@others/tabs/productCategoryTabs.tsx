import i18n from '../../../i18n'
import {makeAutoObservable} from "mobx";

export interface IProductCategoryTabs {
    id: number,
    title: string,
    location: string,
}

export default class ProductCategoryTabs {
    constructor() {
        makeAutoObservable(this);
    }

    private productCategoryTabs: IProductCategoryTabs[] = [
        {id: 1, title: i18n.t("Details"), location: 'details'},
        {id: 2, title: i18n.t("Product List"), location: 'product_category_list'},
    ]

    public getItems() {
        return this.productCategoryTabs
    }
}