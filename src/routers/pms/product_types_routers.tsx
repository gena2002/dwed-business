import React from "react";
import {getPages} from "../../gears";
import {Navigate} from "react-router-dom";
import {error} from "../../components/templates/@others/error_page_templates";
import {create} from "../../components/templates/product_types/create";
import {list} from "../../components/templates/product_types/list";
import {edit} from "../../components/templates/product_types/edit";

export const product_types_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])