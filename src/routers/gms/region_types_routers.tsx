import React from "react";
import {Navigate} from "react-router-dom";
import {getPages} from "../../gears";
import {error} from "../../components/templates/@others/error_page_templates";
import {list} from "../../components/templates/region_types/list";
import {edit} from "../../components/templates/region_types/edit";
import {create} from "../../components/templates/region_types/create";

export const region_types_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])