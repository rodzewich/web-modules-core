'use strict';

import React from "react";
import {FormControl} from "./FormControl";
import Radio from "react-bootstrap/lib/Radio";

let FC = FormControl;

export class RadioControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: 'input'
    };

    inputConverter(value) {
        return {
            checked: this.props.value == value,
            value: value
        };
    }

    render() {

        let {children, ...props} = this.getPropsFromContext();
        let {testAutomationId} = this.props;

        return (
            <Radio
                {...props}
                ref="input"
                type="radio"
                data-test-automation-id={testAutomationId}
            >
                {children}
            </Radio>
        );
        
    }
}
