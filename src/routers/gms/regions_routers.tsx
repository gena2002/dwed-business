import React from "react";
import {error} from "../../components/templates/@others/error_page_templates";
import {list} from "../../components/templates/regions/list";
import {create} from "../../components/templates/regions/create";
import {edit} from "../../components/templates/regions/edit";
import {Navigate} from "react-router-dom";
import {getPages} from "../../gears";

export const regions_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])