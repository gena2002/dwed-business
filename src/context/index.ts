import {createContext} from 'react'

import Store from "../stores/store";

interface State {
    store: Store,
}
export const store = new Store();

export const Context = createContext<State>({
    store,
})
