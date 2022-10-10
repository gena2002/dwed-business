import React from "react";
import MessageHeaderButton from "../../UI/@others/others/MessageHeaderButton";
import NotificationHeaderButton from "../../UI/@others/others/NotificationHeaderButton";
import AccountMenu from "../../UI/@others/others/AccountMenu";
import TranslationButton from "../../UI/@others/atoms/TranslationButton";

const templates = {
    account_menu: {
        body: <AccountMenu/>
    },
    message: {
        body: <MessageHeaderButton/>
    },
    notification: {
        body: <NotificationHeaderButton/>,
    },
    translation: {
        body: <TranslationButton/>
    }
}

export const header = [templates.translation, templates.message, templates.notification, templates.account_menu]