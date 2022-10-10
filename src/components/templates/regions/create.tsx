import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import CreateRegionForm from "../../UI/regions/CreateRegionForm";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import T from "../../UI/@others/atoms/T";

const Header = () => {
    return (<>
        <MyRow>
            <FlexRow>
                <BackButton to={'/regions/list'} tooltip={T('Back')}/>
                <h2>{T('Create Region')}</h2>
            </FlexRow>
        </MyRow>
    </>)
}

const templates = {
    content: {
        header: <Header/>,
        body: <CreateRegionForm/>
    }
}

export const create = [templates.content]