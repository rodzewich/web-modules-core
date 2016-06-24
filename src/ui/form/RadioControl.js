'use strict';

import React from "react";
import {FormControl} from "./FormControl";
import Radio from "react-bootstrap/lib/Radio";

let FC = FormControl;

export class RadioControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: 'radio'
    };

    inputConverter(value) {
        return {
            checked: this.props.value == value,
            value: value
        };
    }

    render() {
        var {children, ...props} = this.getPropsFromContext();
        return (
            <Radio
                {...props}
                ref="input"
                type="radio"
            >
                {children}
            </Radio>
        );
    }
}
