import React from "react";
import {Navigate} from "react-router-dom";
import {getPages} from "../../gears";
import {error} from "../../components/templates/@others/error_page_templates";
import {create} from "../../components/templates/features/create";
import {edit} from "../../components/templates/features/edit";
import {list} from "../../components/templates/features/list";

export const features_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])