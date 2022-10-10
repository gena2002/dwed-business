import React from 'react'

export const Page = React.lazy(() => import('./public/Page'));
export {default as RenderRoutes} from './public/renderRoutes';
export {default as getPages} from './public/getPages';