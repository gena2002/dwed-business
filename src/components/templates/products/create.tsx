import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateProduct from "../../UI/products/CreateProduct";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/products/list'} tooltip={'Обратно'}/>
                <h2>Create Product</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateProduct/>
    }
}

export const create = [templates.content]