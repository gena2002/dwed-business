import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import T from "../../UI/@others/atoms/T";
import CreateOfficialField from "../../UI/official_fields/CreateOfficialField";

const Header = () => {
    return (<>
        <MyRow>
            <FlexRow>
                <BackButton to={'/official_fields/list'} tooltip={T('Back')}/>
                <h2>{T('Create Official Field')}</h2>
            </FlexRow>
        </MyRow>
    </>)
}

const templates = {
    content: {
        header: <Header/>,
        body: <CreateOfficialField/>
    }
}

export const create = [templates.content]