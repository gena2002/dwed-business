import React from "react";
import Top from "../../UI/@others/atoms/Top";
import ProductList from "../../UI/products/ProductList";

const templates = {
    content: {
        header: <Top title={'Products'} add_title={'Add Product'} add_url={`/products/create`}/>,
        body: <ProductList/>
    }
}
export const list = [templates.content]