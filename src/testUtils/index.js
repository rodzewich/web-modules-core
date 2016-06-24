import chai from "chai";
import React from "react";
import SuiteContext from "./SuiteContext";

export {chai, React};

export var ReactTestUtils = require('react-addons-test-utils');

export var expect = chai.expect;

export {SuiteContext};

export function toArray(iterable) {
    return Array.prototype.slice.call(iterable);
}

export function getNodeClassNames(node) {
    return module.exports.toArray(node.classList);
}
