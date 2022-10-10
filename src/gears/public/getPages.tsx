import {Page} from "../index";
import React from "react";

const getPages = (arrays: any[]) => {
    return arrays.map(([path, templates]) => ({path: path, element: <Page templates={templates}/>}))
}

export default getPages;