import React from "react";
import RegionList from "../../UI/regions/RegionList";
import Top from "../../UI/@others/atoms/Top";

const templates = {
    content: {
        header: <Top title={'Regions'} add_title={'Add Region'} add_url={`/regions/create`}/>,
        body: <RegionList/>
    }
}
export const list = [templates.content]