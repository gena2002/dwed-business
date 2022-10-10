import {makeAutoObservable} from "mobx";
import {AdminRegionStore} from "./gms/AdminRegionStore";
import {AdminRegionTranslateStore} from "./gms/AdminRegionTranslateStore";
import {AdminRegionTypeStore} from "./gms/AdminRegionTypeStore";
import {AdminRegionTypeTranslateStore} from "./gms/AdminRegionTypeTranslateStore";
import {AlertStore} from "./@others/AlertStore";
import {FeatureStore} from "./pms/FeatureStore";
import {AdminManufacturerStore} from "./pms/AdminManufacturerStore";
import {AdminOfficialFieldStore} from "./pms/AdminOfficialFieldStore";
import {AdminProductStore} from "./pms/AdminProductStore";
import {AdminCategoryStore} from "./pms/AdminCategoryStore";
import {AdminProductTypeStore} from "./pms/AdminProductTypeStore";
import {BaseFeatureStore} from "./pms/BaseFeatureStore";
import {ExampleFeatureValueStore} from "./pms/ExampleFeatureValueStore";

export default class Store {
    constructor() {
        makeAutoObservable(this);
    }

    private previous_page: string = '';

    public setPreviousPage(previous_page: string) {
        this.previous_page = previous_page;
    }

    public getPreviousPage() {
        return this.previous_page;
    }

    isAuth = false;
    private lang: string = '';

    public setLang(lang: string) {
        this.lang = lang
    }

    public getLang() {
        return this.lang
    }

    /* sub stores */
    public readonly alert = new AlertStore();

    // gms
    public readonly admin_region = new AdminRegionStore();
    public readonly admin_region_translate = new AdminRegionTranslateStore();
    public readonly admin_region_type = new AdminRegionTypeStore();
    public readonly admin_region_type_translate = new AdminRegionTypeTranslateStore();

    //pms
    public readonly base_feature = new BaseFeatureStore();
    public readonly example_feature_value = new ExampleFeatureValueStore();
    public readonly admin_feature = new FeatureStore();
    public readonly admin_manufacturer = new AdminManufacturerStore();
    public readonly admin_official_field = new AdminOfficialFieldStore();
    public readonly admin_product = new AdminProductStore();
    public readonly admin_category = new AdminCategoryStore();
    public readonly admin_product_type = new AdminProductTypeStore();

    /* THE END of sub stores */

    //demo test allow locations
    public readonly allow_locations = [
        {
            id: 1,
            locations: [
                {location: '/', id: 1},
            ]
        },
        // {
        //     id: 2,
        //     locations: [
        //         {location: '/statistics/*', id: 1},
        //     ]
        // },
        // {
        //     id: 3,
        //     locations: [
        //         {location: '/users/*', id: 1},
        //     ]
        // },
        // {
        //     id: 4,
        //     locations: [
        //         {location: '/organizations/*', id: 1},
        //     ]
        // },
        {
            id: 5,
            locations: [
                {location: '/products/*', id: 1},
                {location: '/product_categories/*', id: 2},
                {location: '/product_types/*', id: 3},
            ]
        },
        {
            id: 6,
            locations: [
                {location: '/features/*', id: 1},
                {location: '/base_feature/*', id: 2},
                {location: '/example_feature_value/*', id: 3},

            ]
        },
        {
            id: 7,
            locations: [
                {location: '/manufacturers/*', id: 1},
            ]
        },
        {
            id: 8,
            locations: [
                {location: '/official_fields/*', id: 1},
            ]
        },
        {
            id: 9,
            locations: [
                {location: '/regions/*', id: 1},
                {location: '/region_types/*', id: 2},
            ]
        },


        // {
        //     id: 8,
        //     locations: [
        //         {location: '/posts/*', id: 1},
        //     ]
        // },
        // {
        //     id: 9,
        //     locations: [
        //         {location: '/quests/*', id: 1},
        //     ]
        // },
        // {
        //     id: 10,
        //     locations: [
        //         {location: '/events/*', id: 1},
        //     ]
        // },
        // {
        //     id: 11,
        //     locations: [
        //         {location: '/stream/*', id: 1},
        //     ]
        // },
        // {
        //     id: 12,
        //     locations: [
        //         {location: '/service/*', id: 1},
        //     ]
        // },
        // {
        //     id: 13,
        //     locations: [
        //         {location: '/delivery/*', id: 1},
        //     ]
        // },
        // {
        //     id: 14,
        //     locations: [
        //         {location: '/settings/*', id: 1},
        //     ]
        // },
        // {
        //     id: 15,
        //     locations: [
        //         {location: '/instruction/*', id: 1},
        //     ]
        // },
    ]

}