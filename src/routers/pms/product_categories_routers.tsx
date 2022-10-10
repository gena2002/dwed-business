import React from "react";
import {error} from "../../components/templates/@others/error_page_templates";
import {Navigate} from "react-router-dom";
import {getPages} from "../../gears";
import {list} from "../../components/templates/product_categories/list";
import {edit} from "../../components/templates/product_categories/edit";
import {create} from "../../components/templates/product_categories/create";

export const product_categories_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])