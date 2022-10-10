import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateProductType from "../../UI/product_types/CreateProductType";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/product_types/list'} tooltip={'Обратно'}/>
                <h2>Create Product Type</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateProductType/>
    }
}

export const create = [templates.content]