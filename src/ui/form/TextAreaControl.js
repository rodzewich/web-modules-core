'use strict';

import React from "react";
import Static from "react-bootstrap/lib/FormControlStatic";
import {default as BSFormControl} from "react-bootstrap/lib/FormControl";
import {FormControl} from "./FormControl";

let FC = FormControl;

export class TextAreaControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: "textInput",
        maxLength: 256
    };

    render() {
        
        let {testAutomationId, maxLength, ...props} = this.getPropsFromContext();
        
        return (props.readOnly
                ? <Static ref="input" {...props} data-test-automation-id={testAutomationId}>{props.value}</Static>
                : <BSFormControl
                    {...props}
                    data-test-automation-id={testAutomationId}
                    ref="input"
                    type="textarea"
                    maxLength={maxLength}/>
        );
        
    }
}
