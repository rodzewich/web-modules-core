'use strict';

import React from "react";
import Static from "react-bootstrap/lib/FormControlStatic";
import {default as BSFormControl} from "react-bootstrap/lib/FormControl";
import {FormControl} from "./FormControl";

let FC = FormControl;

export class TextInputControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: "input",
        maxLength: 64
    };

    render() {

        let {type, ...props} = this.getPropsFromContext();
        let {testAutomationId} = this.props;

        type = type || 'text';

        return (props.readOnly
                ? <Static ref="input" {...props} data-test-automation-id={testAutomationId}>{props.value}</Static>
                : <BSFormControl
                    {...props}
                    data-test-automation-id={testAutomationId}
                    type={type}
                    ref="input"/>
        );

    }
}
