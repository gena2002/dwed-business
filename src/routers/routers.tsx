import React from "react";
import {main} from "../components/templates/@others/main_page_templates";
import {Navigate} from "react-router-dom";
import {login} from "../components/templates/@others/login_page_templates";
import Store from "../stores/store";
import {getPages} from "../gears";

export const routers = (store: Store) => {

    if (store.isAuth) return getPages([
        ['*', main],
    ])

    return getPages([
        ['*', [{body: <Navigate to={'login'}/>}]],
        ['/login', login]
    ])

}