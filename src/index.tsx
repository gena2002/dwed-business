import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./stores/store";
import {BrowserRouter} from "react-router-dom";
import {Context} from './context';
import PageLoader from "./components/UI/@others/others/PageLoader";
import './styles/index.css';
import './assets/fonts/golostext/golostext.css';

const store = new Store();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
        <React.Suspense fallback={<PageLoader/>}>
            <BrowserRouter>
                <Context.Provider value={{store}}>
                    <App/>
                </Context.Provider>
            </BrowserRouter>
        </React.Suspense>
    // </React.StrictMode>
);