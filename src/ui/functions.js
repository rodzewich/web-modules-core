import React from "react";
import ReactDOM from "react-dom";
import {Alert} from "./popups/Alert";
import {Confirm} from "./popups/Confirm";
import {Pagination} from "./Pagination";
import {HeaderToolbar} from "./HeaderToolbar";
import {StoreSelectedRecordsSwitcher} from "./StoreSelectedRecordsSwitcher";
import {Note} from "./Note";
import {StoreCounterText} from "./StoreCounterText";
import {SelectedRecordsSwitcher} from "./SelectedRecordsSwitcher";
import {List} from "./list/List";
import {WizardStep} from "./WizardStep";
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

export function localize(strings) {
    Pagination.defaultProps.allText = strings.ALL;
    Pagination.defaultProps.pageSizeSelectorText = strings.SIZE_SELECTOR;
    HeaderToolbar.defaultProps.backText = strings.BACK;
    Note.defaultProps.noteText = strings.NOTE;
    SelectedRecordsSwitcher.defaultProps.showAllText = strings.SHOW_ALL;
    SelectedRecordsSwitcher.defaultProps.showSelectedText = strings.SHOW_SELECTED;
    StoreCounterText.defaultProps.template = strings.TOTAL_AMOUNT;
    StoreSelectedRecordsSwitcher.defaultProps.template = strings.TOTAL_ITEMS_AMOUNT;
    StoreSelectedRecordsSwitcher.defaultProps.showAlltext = strings.SHOW_ALL;
    StoreSelectedRecordsSwitcher.defaultProps.showSelectedtext = strings.SHOW_SELECTED;
    WizardStep.defaultProps.backText = strings.BACK;
    WizardStep.defaultProps.nextText = strings.NEXT;
    WizardStep.defaultProps.cancelText = strings.CANCEL;
    List.defaultProps.noResultsText = strings.NO_RESULTS;
    List.defaultProps.blockedText = strings.PLEASE_WAIT_WHILE_LOADING;
    Alert.defaultProps.title = strings.ALERT;
    Alert.defaultProps.submitText = strings.OK;
    Confirm.defaultProps.title = strings.CONFIRMATION;
    Confirm.defaultProps.submitText = strings.YES;
    Confirm.defaultProps.cancelText = strings.NO;
}
