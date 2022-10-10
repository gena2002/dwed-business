import React from "react";
import {getPages} from "../../gears";
import {Navigate} from "react-router-dom";
import {error} from "../../components/templates/@others/error_page_templates";
import {create} from "../../components/templates/example_feature_value/create";
import {edit} from "../../components/templates/example_feature_value/edit";
import {list} from "../../components/templates/example_feature_value/list";

export const example_feature_value_routers = getPages([
    ['*', error],
    ['/', [{body: <Navigate to={'list'}/>}]],
    ['/list', list],
    ['/list/:edit/*', edit],
    ['/create', create],
])