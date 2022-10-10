import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateRegionType from "../../UI/region_types/CreateRegionType";

const templates = {
    content: {
        header: <MyRow>
            <FlexRow>
                <BackButton to={'/region_types/list'} tooltip={'Обратно'}/>
                <h2>Create Region Type</h2>
            </FlexRow>
        </MyRow>,
        body: <CreateRegionType/>
    }
}

export const create = [templates.content]