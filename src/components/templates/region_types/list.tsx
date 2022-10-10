import React from "react";
import RegionTypesList from "../../UI/region_types/RegionTypesList";
import Top from "../../UI/@others/atoms/Top";

const templates = {
    content: {
        header: <Top title={'Region Types'} add_title={'Add Region Type'} add_url={`/region_types/create`}/>,
        body: <RegionTypesList/>
    }
}
export const list = [templates.content]