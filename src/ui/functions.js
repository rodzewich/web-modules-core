import React from "react";
import ReactDOM from "react-dom";
import {Alert} from "./popups/Alert";
import {Confirm} from "./popups/Confirm";
import {isReactElement} from "../utils/functions";

export function showPopup(componentOrElement, props) {
    var element = isReactElement(componentOrElement)
        ? componentOrElement
        : React.createElement(componentOrElement, props, props.messageText);
    ReactDOM.render(element, document.getElementById('popup-container'));
    scrollToTop();
}

export function showAlert(params) {
    if (typeof params != 'object') {
        params = {messageText: params};
    }
    showPopup(Alert, params);
}

export function showConfirmation(params) {
    showPopup(Confirm, params);
}

export function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
