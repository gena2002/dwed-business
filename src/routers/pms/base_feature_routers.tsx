import React from "react";
import {getPages} from "../../gears";
import {Navigate} from "react-router-dom";
import {error} from "../../components/templates/@others/error_page_templates";
import {create} from "../../components/templates/base_feature/create";
import {edit} from "../../components/templates/base_feature/edit";
import {list} from "../../components/templates/base_feature/list";

export const base_feature_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])