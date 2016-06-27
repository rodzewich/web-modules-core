'use strict';

// React stuff
export var React = require('react');
export var ReactDOM = require('react-dom');
export var ReactRouter = require('react-router');
export var ReactVis = require('react-vis');
export var ReactRouterBootstrap = require('react-router-bootstrap');
export var History = require('history');
export var SDK = require('ringcentral');

// Polyfills
var Promise = require('bluebird');
window.Promise = Promise;

require('array.prototype.find');

var findIndexPolyfill = require('array.prototype.findindex');
if (typeof Array.prototype.findIndex !== 'function') {
    findIndexPolyfill.shim();
}

import * as Constants from "./utils/Constants";
import {localize} from "./ui/functions";
import {getConfig, setup} from "./utils/functions";

// Functions
export {Constants as Constants, localize, setup, getConfig};

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
export {default as InputGroup} from 'react-bootstrap/lib/InputGroup';
export {default as InputGroupAddon} from 'react-bootstrap/lib/InputGroupAddon';
export {default as InputGroupButton} from 'react-bootstrap/lib/InputGroupButton';
export {default as Media} from 'react-bootstrap/lib/Media';

// Utils
export {default as EventBus} from './utils/EventBus';
export {default as SelectionModel} from './utils/SelectionModel';
export {default as BrandedFileLoader} from './utils/BrandedFileLoader';

export {
    translate,
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
    cleanFormState
} from "./utils/functions";

export {
    showPopup,
    showAlert,
    showConfirmation,
    scrollToTop
} from "./ui/functions";

export {isSelectedRow} from './ui/list/utils';

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
export {DatePicker} from './ui/form/DatePicker';
export {AddonInput} from './ui/form/AddonInput';
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
export {DatePickerControl} from './ui/form/DatePickerControl';
export {AddonInputControl} from './ui/form/AddonInputControl';
export {RadioControl} from './ui/form/RadioControl';
export {SelectControl} from './ui/form/SelectControl';
export {MultiSelect} from './ui/form/MultiSelect';
export {RegularSelect} from './ui/form/RegularSelect';
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
export {Pagination} from "./ui/Pagination";
export {HeaderToolbar} from "./ui/HeaderToolbar";
export {StoreSelectedRecordsSwitcher} from "./ui/StoreSelectedRecordsSwitcher";
export {Note} from "./ui/Note";
export {StoreCounterText} from "./ui/StoreCounterText";
export {SelectedRecordsSwitcher} from "./ui/SelectedRecordsSwitcher";
export {List} from "./ui/list/List";
export {WizardStep} from "./ui/WizardStep";
export {Alert} from "./ui/popups/Alert";
export {Confirm} from "./ui/popups/Confirm";

var showLoader = function() {};
var hideLoader = function() {};

export function loadPackage(modules, callback, errback) {

    if (!Array.isArray(modules)) modules = [modules];

    showLoader();

    // guard against Webpack context parser
    window['require'](modules.map(function(p) {
        return (p.indexOf('app/') != -1 && p.indexOf('/index') != -1) ? p : 'app/' + p + '/index'; //TODO Make app prefix configurable
    }), function() {
        hideLoader();
        callback.apply(null, arguments);
    }, function() {
        hideLoader();

        if (errback) {
            errback.apply(null, arguments);
        } else {
            if (arguments[0] && arguments[0].stack) console.error(arguments[0].stack);
            console.error(arguments);
        }
    });

}

export function bootstrap(options) {

    showLoader = options.showLoader || showLoader;
    hideLoader = options.hideLoader || hideLoader;

    setup(options.config, options.locale);

    loadPackage(['app/lang/common/index-en_US'], function(langCommon) {

        localize(langCommon);

        loadPackage(['app/core/all/index-' + getConfig().brandId], options.done, function() { //TODO Allow to force certain brand

            console.warn('Skin for', getConfig().brandId, 'cannot be loaded, fallback to default');

            loadPackage(['app/core/all/index-default'], options.done);

        });

    });

}