import {
    Category2,
    Box,
    Star,
    StatusUp,
    GlobalSearch,
    Briefcase,
    Book,
    Routing,
    User,
    Setting2,
    InfoCircle,
    PlayCircle,
    Truck,
    MoneySend,
    Gift
} from "iconsax-react";
import React from "react";
import i18n from '../../i18n';
import {makeAutoObservable} from "mobx";
import Store from "../store";

export interface IDrawerParams {
    id: number;
    title: string;
    uncover: boolean;
    location?: string;
    icon: React.ReactNode;
    children?: IDrawerParams[];
}

export default class DrawerItems {
    constructor() {
        makeAutoObservable(this);
    }

    private items: IDrawerParams[] = [
        {id: 1, title: i18n.t("Home"), uncover: false, location: '/', icon: <Category2 size="24"/>},
        {id: 2, title: i18n.t("Statistics"), uncover: false, location: '/statistics', icon: <StatusUp size="24"/>},
        {id: 3, title: i18n.t("Users"), uncover: false, location: '/users', icon: <User size="24"/>},
        {
            id: 4,
            title: i18n.t("Organizations"),
            uncover: false,
            location: '/organizations',
            icon: <Briefcase size="24"/>
        },
        {
            id: 5,
            title: i18n.t("Products"),
            uncover: true,
            icon: <Box size="24"/>,
            children: [
                {id: 1, title: i18n.t("Product List"), uncover: false, location: '/products', icon: null,},
                {
                    id: 2,
                    title: i18n.t("Product Categories"),
                    uncover: false,
                    location: '/product_categories',
                    icon: null
                },
                {
                    id: 3,
                    title: i18n.t("Product Types"),
                    uncover: false,
                    location: '/product_types',
                    icon: null
                },
            ]
        },
        {
            id: 6,
            title: i18n.t("Features"),
            uncover: true,
            icon: <Gift size="24"/>,
            children: [
                {
                    id: 1,
                    title: i18n.t("Feature List"),
                    uncover: false,
                    location: '/features',
                    icon: null
                },
                {
                    id: 2,
                    title: i18n.t("Base Features"),
                    uncover: false,
                    location: '/base_feature',
                    icon: null
                },
                {
                    id: 3,
                    title: i18n.t("Example Feature Values"),
                    uncover: false,
                    location: '/example_feature_value',
                    icon: null
                },
            ]
        },
        {
            id: 7,
            title: i18n.t("Manufacturers"),
            uncover: false,
            location: '/manufacturers',
            icon: <Category2 size="24"/>
        },
        {
            id: 8,
            title: i18n.t("Official Fields"),
            uncover: false,
            location: '/official_fields',
            icon: <Category2 size="24"/>
        },
        {
            id: 9,
            title: i18n.t("Regions"),
            uncover: true,
            icon: <GlobalSearch size="24"/>,
            children: [
                {id: 1, title: i18n.t("Region List"), uncover: false, location: '/regions', icon: null},
                {
                    id: 2,
                    title: i18n.t("Region Types"),
                    uncover: false,
                    location: '/region_types',
                    icon: null
                },
            ]
        },


        // {id: 8, title: i18n.t("Posts"), uncover: false, location: '/posts', icon: <Book size="24"/>},
        // {id: 9, title: i18n.t("Quests"), uncover: false, location: '/quests', icon: <Routing size="24"/>},
        // {id: 10, title: i18n.t("Events"), uncover: false, location: '/events', icon: <Star size="24"/>},
        // {id: 11, title: i18n.t("Stream"), uncover: false, location: '/stream', icon: <PlayCircle size="24"/>},
        // {id: 12, title: i18n.t("Service"), uncover: false, location: '/service', icon: <MoneySend size="24"/>},
        // {id: 13, title: i18n.t("Delivery"), uncover: false, location: '/delivery', icon: <Truck size="24"/>},
        // {id: 14, title: i18n.t("Settings"), uncover: false, location: '/settings', icon: <Setting2 size="24"/>},
        // {id: 15, title: i18n.t("Instruction"), uncover: false, location: '/instruction', icon: <InfoCircle size="24"/>},
    ]

    rec(array: IDrawerParams[], v:IDrawerParams) {
        array.some(function (v2) {
            return v?.id === v2?.id;
        })
    }

    public getItems(store: Store) {
        return this.items.filter(function (v) {
            return store.allow_locations.some(function (v2) {
                return v.id == v2.id;
            })
        });
    }
}