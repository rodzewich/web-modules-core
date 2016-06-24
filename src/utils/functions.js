import React from "react";
import ReactDOM from "react-dom";
import {useRouterHistory} from "react-router";
import {createHashHistory} from "history";
import formatMessage from "format-message";

export var defaultUserLanguage = 'en_US';
export var defaultBrandId = '0';

var config = {};

// TODO rename. actually is formatMessage not a translate
const NON_TRANSLATED_PREFIX = 'NOT-TRANSLATED:';
export function translate(str, args) {
    if (!str) {
        return "NOT-TRANSLATED";
    }

    if (typeof str == 'object') {
        str = str[config.brandId] || str[defaultBrandId];
    }

    if(str.indexOf(NON_TRANSLATED_PREFIX) === 0) {
        str = str.replace(NON_TRANSLATED_PREFIX, '');
    }

    return formatMessage(str, args);
}

export function setup(conf, locale) {
    config = conf; // IMPORTANT - config should be link to RC.Config, do not clone conf object!!!
    hijackRequireJS(locale);
}

export function getSilentRouterHistory() {
    return useRouterHistory(createHashHistory)({
        queryKey: false
    });
}

export function setDocumentTitle(title) {
    var suffix = config.headerAccountBlock || config.brandDisplayName;
    document.title = title + ' - ' + suffix;
}

// todo move to separate file
let currentUserHelper = {

    isGroupManager() {
        return this.getManagedGroupsList().length > 0;
    },

    getManagedGroupsList() {
        return config.loggedMailboxManagerUserGroups || [];
    },

    getPermissions() {
        return Object.keys(config.userPermissions);
    },

    hasAnyPermission(permissionsList) {
        permissionsList = _.uniq(permissionsList);
        return _.intersection(this.getPermissions(), permissionsList).length > 0;
    },

    hasAllPermission(permissionsList) {
        permissionsList = _.uniq(permissionsList);
        return _.intersection(this.getPermissions(), permissionsList).length == permissionsList.length;
    }
};

export var CurrentUser = currentUserHelper;
export var getPermissions = currentUserHelper.getPermissions; //shorthand
export var hasAnyPermission = currentUserHelper.hasAnyPermission; //shorthand
export var hasAllPermission = currentUserHelper.hasAllPermission; //shorthand

/**
 * FIXME There must be a better way, sneak into require.load for example
 */
export function hijackRequireJS(locale) {
    locale = locale || config.userLanguage || defaultUserLanguage;

    patch("require");
    patch("define");

    function patch(method) {
        var originalMethod = window[method];

        if (!originalMethod._hijacked) {
            window[method] = function () {
                if (Array.isArray(arguments[0])) {
                    arguments[0] = arguments[0].map(localizedPath);
                }

                return originalMethod.apply(window, arguments);
            };

            window[method]._hijacked = true;
        }
    }

    function localizedPath(path) {
        var safety = 'index-';
        return path.replace(safety + defaultUserLanguage, safety + locale);
    }
}

export function isReactComponent(val) {
    return val instanceof React.Component.constructor;
}

export function isReactElement(val) {
    return React.isValidElement(val);
}

export function mountComponent(Component, container, params) {
    var element;
    //FIXME React Router needs to be created from scratch otherwise a previous state is picked up
    //FIXME Replace all existing routers with router factory functions
    if (typeof Component === "function" && Component.name === "createRouter"){
        Component = Component();
    }
    if (isReactElement(Component)) {
        element = Component;
    }
    else if (isReactComponent(Component)) {
        element = React.createElement(Component, params);
    }

    if (!React.isValidElement(element)) {
        console.error(Component);
        throw new Error("Cannot render invalid React element");
    }

    return ReactDOM.render(element, container);
}

export function writeCookie(name, value, path, duration) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (path) {
        cookie += '; path=' + path;
    }

    if (duration) {
        let date = new Date();
        date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);
        cookie += '; expires=' + date.toUTCString();
    }

    document.cookie = cookie;
}

export function readCookie(name) {
    var value = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
    return (value) ? decodeURIComponent(value[1]) : null;
}

export function isSafeStringValue(value) {
    if (value.length > 0) {
        return value.indexOf('"') == -1
            && value.indexOf('/') == -1
            && value.indexOf("<") == -1
            && value.indexOf(">") == -1
            && value.indexOf("&") == -1;
    } else {
        return true;
    }
}

//PC userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36"
//MAC userAgent: ""
export var OS = {
    is: {
        mac: (/mac\sos\sx/i).test(navigator.userAgent),
        win: (/windows/i).test(navigator.userAgent)
    },
    name: 'others'
};
OS.is.others = !Object.keys(OS.is).some(o=> {
    if (OS.is[o]) {
        OS.name = o;
        return true;
    }
});

export function fillBrandName(str) {
    return translate(str, {brandName: config.shortBrandName});
}

export function extendFormState(prevState, newState) {
    return _.merge(prevState, newState);
}

export function cleanFormState(prevState, removedIds) {
    return _.omit(prevState, removedIds);
}

export function getConfig() {
    return config;
}