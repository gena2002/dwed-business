import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateBaseFeature from "../../UI/base_feature/CreateBaseFeature";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/base_feature/list'} tooltip={'Обратно'}/>
                <h2>Create Base Feature</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateBaseFeature/>
    }
}

export const create = [templates.content]