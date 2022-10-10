import React from "react";
import Top from "../../UI/@others/atoms/Top";
import OfficialFieldsList from "../../UI/official_fields/OfficialFieldsList";

const templates = {
    content: {
        header: <Top title={'Official Fields'} add_title={'Add Official Field'} add_url={`/official_fields/create`}/>,
        body: <OfficialFieldsList/>
    }
}
export const list = [templates.content]

