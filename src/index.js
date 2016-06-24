'use strict';

// React stuff
export var React = require('react');
export var ReactDOM = require('react-dom');
export var ReactRouter = require('react-router');
export var ReactRouterBootstrap = require('react-router-bootstrap');
export var History = require('history');

// Polyfills
var Promise = require('bluebird');
window.Promise = Promise;

require('array.prototype.find');

var findIndexPolyfill = require('array.prototype.findindex');
if (typeof Array.prototype.findIndex !== 'function') {
    findIndexPolyfill.shim();
}

import * as Constants from "./utils/Constants";
import {Pagination} from "./ui/Pagination";
import {HeaderToolbar} from "./ui/HeaderToolbar";
import {StoreSelectedRecordsSwitcher} from "./ui/StoreSelectedRecordsSwitcher";
import {Note} from "./ui/Note";
import {StoreCounterText} from "./ui/StoreCounterText";
import {SelectedRecordsSwitcher} from "./ui/SelectedRecordsSwitcher";
import {List} from "./ui/list/List";
import {WizardStep} from "./ui/WizardStep";
import {Alert} from "./ui/popups/Alert";
import {Confirm} from "./ui/popups/Confirm";
import * as ReactVis from "react-vis";
export {ReactVis};

// Utils
export var formatMessage = require('format-message');
export var validator = require('validator');
export var _ = require('lodash');
export var moment = require('moment');
export var classnames = require('classnames');
export var TinyEmitter = require('tiny-emitter');

// React Bootstrap Non-Wrapped
export {default as Row} from 'react-bootstrap/lib/Row';
export {default as Col} from 'react-bootstrap/lib/Col';
export {default as ButtonToolbar} from 'react-bootstrap/lib/ButtonToolbar';
export {default as ButtonGroup} from 'react-bootstrap/lib/ButtonGroup';
export {default as OverlayTrigger} from 'react-bootstrap/lib/OverlayTrigger';
export {default as Navbar} from 'react-bootstrap/lib/Navbar';
export {default as NavItem} from 'react-bootstrap/lib/NavItem';
export {default as Nav} from 'react-bootstrap/lib/Nav';
export {default as Table} from 'react-bootstrap/lib/Table';
export {default as Collapse} from 'react-bootstrap/lib/Collapse';
export {default as DropdownButton} from 'react-bootstrap/lib/DropdownButton';
export {default as Dropdown} from 'react-bootstrap/lib/Dropdown';
export {default as MenuItem} from 'react-bootstrap/lib/MenuItem';
export {default as Static} from "react-bootstrap/lib/FormControls/Static";
export {default as StaticControl} from "react-bootstrap/lib/FormControlStatic";
export {default as BootstrapAlert} from 'react-bootstrap/lib/Alert';
export {default as ControlLabel} from 'react-bootstrap/lib/ControlLabel';
export {default as HelpBlock} from 'react-bootstrap/lib/HelpBlock';

// Utils
export {default as EventBus} from './utils/EventBus';
export {default as SelectionModel} from './utils/SelectionModel';
export {default as BrandedFileLoader} from './utils/BrandedFileLoader';

export {
    translate,
    setup,
    getSilentRouterHistory,
    setDocumentTitle,
    CurrentUser,
    getPermissions,
    hasAllPermission,
    hasAnyPermission,
    hijackRequireJS,
    isReactComponent,
    isReactElement,
    mountComponent,
    writeCookie,
    readCookie,
    isSafeStringValue,
    OS,
    fillBrandName,
    extendFormState,
    cleanFormState,
    getConfig
} from "./utils/functions";

export {
    showPopup,
    showAlert,
    showConfirmation,
    scrollToTop
} from "./ui/functions";

export {isSelectedRow} from './ui/list/utils';

// We mangle with these components in localize() function

export {
    Constants,
    Pagination,
    HeaderToolbar,
    StoreSelectedRecordsSwitcher,
    Note,
    StoreCounterText,
    SelectedRecordsSwitcher,
    List,
    WizardStep,
    Alert,
    Confirm
};

// Deprecated components !!!
export {ListCheckbox} from './ui/list/ListCheckbox';
export {ListHeaderCheckbox} from './ui/list/ListHeaderCheckbox';
export {ListRadio} from './ui/list/ListRadio';
// Deprecated components !!!

export {Popup} from './ui/popups/Popup';
export {Filter} from './ui/Filter';
export {Menu} from './ui/Menu';
export {TabPanel, TabItem} from './ui/TabPanel';
export {Button} from './ui/Button';
export {Form} from './ui/form/Form';
export {TextInput} from './ui/form/TextInput';
export {TextArea} from './ui/form/TextArea';
export {Checkbox} from './ui/form/Checkbox';
export {CheckboxGroup} from './ui/form/CheckboxGroup';
export {Radio} from './ui/form/Radio';
export {Select} from './ui/form/Select';
export {FormGroup} from './ui/form/FormGroup';
export {FormGroup as Input} from './ui/form/FormGroup'; //FIXME Remove legacy declaration
export {FormControl} from './ui/form/FormControl';
export {FormControl as FormInput} from './ui/form/FormControl'; //FIXME Remove legacy declaration
export {TextInputControl} from './ui/form/TextInputControl';
export {TextAreaControl} from './ui/form/TextAreaControl';
export {CheckboxControl} from './ui/form/CheckboxControl';
export {RadioControl} from './ui/form/RadioControl';
export {SelectControl} from './ui/form/SelectControl';
export {MultiSelect} from './ui/form/MultiSelect';
export {Translate} from './ui/Translate';
export {ListControlCheckbox} from './ui/list/ListControlCheckbox';
export {ListHighlight} from './ui/list/ListHighlight';
export {ListSorter} from './ui/list/ListSorter';
export {ListRow} from './ui/list/ListRow';
export {GridSorter} from './ui/list/GridSorter';
export {GridCell} from './ui/list/GridCell';
export {GridRowActions} from './ui/GridRowActions';
export {CollapsibleList} from './ui/CollapsibleList';
export {Icon} from './ui/Icon';
export {HeaderIcon} from './ui/HeaderIcon';
export {Panel} from './ui/Panel';
export {Block} from './ui/Block';
export {Message} from './ui/Message';
export {Wizard} from './ui/Wizard';
export {Tooltip} from './ui/Tooltip';
export {BorderedList, BorderedListItem} from './ui/BorderedList';
export {BrandedImage} from './ui/BrandedImage';
export {MoreButton} from './ui/MoreButton';

/**
 * FIXME Add others
 * @param strings
 */
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