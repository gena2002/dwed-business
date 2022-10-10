import React from "react";
import Top from "../../UI/@others/atoms/Top";
import ManufacturersList from "../../UI/manufacturers/ManufacturersList";

const templates = {
    content: {
        header: <Top title={'Manufacturers'} add_title={'Add Manufacturer'} add_url={`/manufacturers/create`}/>,
        body: <ManufacturersList/>
    }
}
export const list = [templates.content]