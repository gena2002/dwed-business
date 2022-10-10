import React from "react";
import {getPages} from "../../gears";
import {Navigate} from "react-router-dom";
import {error} from "../../components/templates/@others/error_page_templates";
import {list} from "../../components/templates/manufacturers/list";
import {edit} from "../../components/templates/manufacturers/edit";
import {create} from "../../components/templates/manufacturers/create";

export const manufacturers_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])