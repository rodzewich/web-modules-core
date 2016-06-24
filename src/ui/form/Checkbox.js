'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {CheckboxControl} from "./CheckboxControl";

let FG = FormGroup;

export class Checkbox extends FormGroup {

    // extends defaultProps from superclass 
    static defaultProps = {
        ...FG.defaultProps,
        testAutomationId: 'checkbox'
    };

    renderInput() {
        let {label, children, ...props} = this.props;
        return <CheckboxControl {...props} ref="control">{children || label}</CheckboxControl>;
    }
}
