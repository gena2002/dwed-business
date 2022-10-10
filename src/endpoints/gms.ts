import {TLang} from "../models/@others/TLang";

export const admin_region = {
    get_all() {
        return `/GMS/api/v1.0/admin/region/`;
    },
    post() {
        return `/GMS/api/v1.0/admin/region/`;
    },
    get(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/`;
    },
    put(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/`;
    },
    patch(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/`;
    },
    delete(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/`;
    },
    get_path(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/path/`;
    },
}

export const admin_region_translate = {
    get_all(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/`;
    },
    post(id: number) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/`;
    },
    get(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/${lang}`;
    },
    put(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/${lang}`;
    },
    patch(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/${lang}`;
    },
    delete(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region/${id}/translate/${lang}`;
    },
}

export const admin_region_type = {
    get_all() {
        return `/GMS/api/v1.0/admin/region_type/`;
    },
    post() {
        return `/GMS/api/v1.0/admin/region_type/`;
    },
    get(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/`;
    },
    put(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/`;
    },
    patch(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/`;
    },
    delete(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/`;
    },
}

export const admin_region_type_translate = {
    get_all(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate/`;
    },
    post(id: number) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate`;
    },
    get(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate/${lang}/`;
    },
    put(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate/${lang}/`;
    },
    patch(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate/${lang}/`;
    },
    delete(id: number, lang: TLang) {
        return `/GMS/api/v1.0/admin/region_type/${id}/translate/${lang}/`;
    },
}
