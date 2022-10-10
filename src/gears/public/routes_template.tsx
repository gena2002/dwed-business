import React from 'react';
import {IRoute} from "../private/IRoute";
import {Page, RenderRoutes} from "../index";
import {ITemplate} from "../private/ITemplate";

export const routes_template = (routers: IRoute[], templates?: ITemplate[]) => {
    const template = {
        templates: {
            body: templates !== undefined ? <Page templates={templates}/> : <></>
        },
        routers: {
            body: <RenderRoutes routers={routers}/>
        }
    }

    return [template.templates, template.routers];
}