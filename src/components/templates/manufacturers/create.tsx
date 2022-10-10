import React from "react";
import BackButton from "../../UI/@others/atoms/BackButton";
import {MyRow} from "../../UI/@others/atoms/MyRow";
import FlexRow from "../../UI/@others/atoms/FlexRow";
import CreateManufacturer from "../../UI/manufacturers/CreateManufacturer";
import T from "../../UI/@others/atoms/T";

const Header = () => {
    return (<>
        <MyRow>
            <FlexRow>
                <BackButton to={'/manufacturers/list'} tooltip={T('Back')}/>
                <h2>{T('Create Manufacturer')}</h2>
            </FlexRow>
        </MyRow>
    </>)
}

const templates = {
    content: {
        header: <Header/>,
        body: <CreateManufacturer/>
    }
}

export const create = [templates.content]