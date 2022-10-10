import React from "react";
import {error} from "../../components/templates/@others/error_page_templates";
import {home} from "../../components/templates/@others/home_page_templates";
import {routes_template} from "../../gears/public/routes_template";
import {getPages} from "../../gears";
import Store from "../../stores/store";
import {region_types_routers} from "../gms/region_types_routers";
import {regions_routers} from "../gms/regions_routers";
import {product_types_routers} from "../pms/product_types_routers";
import {manufacturers_routers} from "../pms/manufacturers_routers";
import {official_fields_routers} from "../pms/official_fields_routers";
import {product_routers} from "../pms/product_routers";
import {product_categories_routers} from "../pms/product_categories_routers";
import {features_routers} from "../pms/features_routers";
import {base_feature_routers} from "../pms/base_feature_routers";
import {example_feature_value_routers} from "../pms/example_feature_value_routers";

export const main_routers = (store: Store) => {

    const array = [
        ['/', home],
        // ['/statistics/*', routes_template(statistics_routers)],
        // ['/users/*', routes_template(users_routers)],
        // ['/organizations/*', routes_template(organizations_routers)],
        ['/products/*', routes_template(product_routers)],
        ['/product_categories/*', routes_template(product_categories_routers)],
        ['/product_types/*', routes_template(product_types_routers)],
        ['/features/*', routes_template(features_routers)],
        ['/base_feature/*', routes_template(base_feature_routers)],
        ['/example_feature_value/*', routes_template(example_feature_value_routers)],
        ['/official_fields/*', routes_template(official_fields_routers)],
        ['/manufacturers/*', routes_template(manufacturers_routers)],
        ['/regions/*', routes_template(regions_routers)],
        ['/region_types/*', routes_template(region_types_routers)],
        // ['/posts/*', routes_template(posts_routers)],
        // ['/quests/*', routes_template(quests_routers)],
        // ['/events/*', routes_template(events_routers)],
        // ['/stream/*', routes_template(stream_routers)],
        // ['/service/*', routes_template(service_routers)],
        // ['/delivery/*', routes_template(delivery_routers)],
        // ['/settings/*', routes_template(settings_routers)],
        // ['/instruction/*', routes_template(instruction_routers)],
    ]

    function diff() {
        return array.filter(function (v) {
            return store.allow_locations.some(function (v2) {
                return v2.locations.some(function (v3) {
                    return v[0] == v3.location;
                })

            })
        })
    }

    let pages = diff();
    pages.push(['*', error])
    return getPages(pages)
}