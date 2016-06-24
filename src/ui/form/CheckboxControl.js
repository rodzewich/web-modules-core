'use strict';

import React from "react";
import {FormControl, isIndeterminate} from "./FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";

let FC = FormControl;

export class CheckboxControl extends FormControl {

    // extends defaultProps from superclass 
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: 'checkbox'
    };

    getValue() {
        return this.getInputDOMNode().checked;
    }

    inputConverter(value) {
        return {checked: value};
    }

    outputConverter(e) {
        return e.target.checked;
    }

    getInputDOMNode() {
        return this.input;
    }

    componentWillReceiveProps(newProps) {
        this.getInputDOMNode().indeterminate = isIndeterminate(newProps.checked);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    render() {

        var {testAutomationId, checked, readOnly, disabled, children, ...props} = this.getPropsFromContext();

        return (
            <Checkbox
                disabled={readOnly || disabled}
                checked={checked}
                inputRef={(input) => this.input = input}
                data-test-automation-id={testAutomationId}
                {...props}
            >
                {children}
            </Checkbox>
        );

    }
}
