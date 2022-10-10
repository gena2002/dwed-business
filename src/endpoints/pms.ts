export const feature = {
    get_all() {
        return `/PMS/api/v1.0/admin/feature/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/feature/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/feature/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/feature/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/feature/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/feature/${id}/`;
    },
    get_prepared_values(id: number) {
        return `/PMS/api/v1.0/admin/feature/${id}/prepared_values/`;
    },
}

export const admin_manufacturer = {
    get_all() {
        return `/PMS/api/v1.0/admin/manufacturer/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/manufacturer/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/manufacturer/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/manufacturer/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/manufacturer/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/manufacturer/${id}/`;
    },
}

export const admin_official_field = {
    get_all() {
        return `/PMS/api/v1.0/admin/official_field/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/official_field/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/official_field/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/official_field/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/official_field/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/official_field/${id}/`;
    },
}

export const admin_product = {
    get_all() {
        return `/PMS/api/v1.0/admin/product/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/product/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/product/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/product/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/product/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/product/${id}/`;
    },
    get_feature(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/feature/`;
    },
    post_feature(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/feature/`;
    },
    get_all_image(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/image/`;
    },
    post_image(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/image/`;
    },
    get_image(product_id: number, id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/image/${id}/`;
    },
    patch_image(product_id: number, id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/image/${id}/`;
    },
    delete_image(product_id: number, id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/image/${id}/`;
    },
    get_official_field(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/official_field/`;
    },
    post_official_field(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/official_field/`;
    },
    get_possible_feature(product_id: number) {
        return `/PMS/api/v1.0/admin/product/${product_id}/possible_feature/`;
    },
}

export const admin_category = {
    get_all() {
        return `/PMS/api/v1.0/admin/product_category/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/product_category/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/product_category/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/product_category/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/product_category/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/product_category/${id}/`;
    },
    get_path(id: number) {
        return `/PMS/api/v1.0/admin/product_category/${id}/path/`;
    },
}

export const admin_product_type = {
    get_all() {
        return `/PMS/api/v1.0/admin/product_type/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/product_type/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/product_type/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/product_type/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/product_type/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/product_type/${id}/`;
    },
}

export const base_feature = {
    get_all() {
        return `/PMS/api/v1.0/admin/base_feature/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/base_feature/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/base_feature/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/base_feature/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/base_feature/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/base_feature/${id}/`;
    },
    get_path(id: number) {
        return `/PMS/api/v1.0/admin/base_feature/${id}/path/`;
    },
}

export const example_feature_value = {
    get_all() {
        return `/PMS/api/v1.0/admin/example_feature_value/`;
    },
    post() {
        return `/PMS/api/v1.0/admin/example_feature_value/`;
    },
    get(id: number) {
        return `/PMS/api/v1.0/admin/example_feature_value/${id}/`;
    },
    put(id: number) {
        return `/PMS/api/v1.0/admin/example_feature_value/${id}/`;
    },
    patch(id: number) {
        return `/PMS/api/v1.0/admin/example_feature_value/${id}/`;
    },
    delete(id: number) {
        return `/PMS/api/v1.0/admin/example_feature_value/${id}/`;
    },
}