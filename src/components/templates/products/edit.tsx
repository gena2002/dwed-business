import React from "react";
import EditProduct from "../../UI/products/EditProduct";
import UploadProductImages from "../../UI/products/UploadProductImages";
import Filerobot from "../../UI/@others/ImageEditor";

const templates = {
    content: {
        body: <>
            <EditProduct/>
            <UploadProductImages/>
        </>
    }
}
export const edit = [templates.content]