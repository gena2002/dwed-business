import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateFeature from "../../UI/features/CreateFeature";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/features/list'} tooltip={'Обратно'}/>
                <h2>Create Feature</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateFeature/>
    }
}

export const create = [templates.content]