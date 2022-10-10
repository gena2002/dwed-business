import React from "react";
import {getPages} from "../../gears";
import {Navigate} from "react-router-dom";
import {error} from "../../components/templates/@others/error_page_templates";
import {create} from "../../components/templates/official_fields/create";
import {edit} from "../../components/templates/official_fields/edit";
import {list} from "../../components/templates/official_fields/list";

export const official_fields_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])