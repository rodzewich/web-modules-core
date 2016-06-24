'use strict';

import React from "react";
import {FormControl} from "./FormControl";
import {default as BSFormControl} from "react-bootstrap/lib/FormControl";

let FC = FormControl;

export class SelectControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: "select"
    };

    render() {
        
        let {testAutomationId, children, ...props} = this.getPropsFromContext();
        
        return (
            <span className="rc-select">
                <BSFormControl
                    componentClass="select"
                    data-test-automation-id={testAutomationId}
                    {...props}
                    ref="input"
                >
                    {children}
                </BSFormControl>
            </span>
        );
        
    }
}