import React from "react";
import Top from "../../UI/@others/atoms/Top";
import ProductCategoriesList from "../../UI/product_categories/ProductCategoriesList";

const templates = {
    content: {
        header: <Top title={'Product Categories List'} add_title={'Add Product Category'} add_url={`/product_categories/create`}/>,
        body: <ProductCategoriesList/>
    }
}
export const list = [templates.content]