import React from "react";
import Top from "../../UI/@others/atoms/Top";
import BaseFeatureList from "../../UI/base_feature/BaseFeatureList";

const templates = {
    content: {
        header: <Top title={'Base Feature'} add_title={'Add Base Feature'} add_url={`/base_feature/create`}/>,
        body: <BaseFeatureList/>
    }
}
export const list = [templates.content]