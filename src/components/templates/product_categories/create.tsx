import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateProductCategoriesForm from "../../UI/product_categories/CreateProductCategoryForm";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/product_categories/list'} tooltip={'Обратно'}/>
                <h2>Create Product Category</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateProductCategoriesForm/>
    }
}

export const create = [templates.content]