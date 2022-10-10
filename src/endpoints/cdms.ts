import {TLang} from "../models/@others/TLang";

export const category = {
    get_all() {
        return `/CDMS/api/v1.0/category/`;
    },
    post() {
        return `/CDMS/api/v1.0/category/`;
    },
    get(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/`;
    },
    put(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/`;
    },
    patch(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/`;
    },
    delete(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/`;
    },
}

export const category_translate = {
    get_all(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/`;
    },
    post(category_id: number) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/`;
    },
    get(category_id: number, lang: TLang) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/${lang}/`;
    },
    put(category_id: number, lang: TLang) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/${lang}/`;
    },
    patch(category_id: number, lang: TLang) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/${lang}/`;
    },
    delete(category_id: number, lang: TLang) {
        return `/CDMS/api/v1.0/category/${category_id}/translate/${lang}/`;
    },
}