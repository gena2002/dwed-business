import React from "react";
import Top from "../../UI/@others/atoms/Top";
import FeatureList from "../../UI/features/FeatureList";

const templates = {
    content: {
        header: <Top title={'Features'} add_title={'Add Feature'} add_url={`/features/create`}/>,
        body: <FeatureList/>
    }
}
export const list = [templates.content]