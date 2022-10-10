import React from "react";
import Top from "../../UI/@others/atoms/Top";
import ProductTypesList from "../../UI/product_types/ProductTypesList";

const templates = {
    content: {
        header: <Top title={'Product Types'} add_title={'Add Product Type'} add_url={`/product_types/create`}/>,
        body: <ProductTypesList/>
    }
}
export const list = [templates.content]