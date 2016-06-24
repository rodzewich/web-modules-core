'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {SelectControl} from "./SelectControl";

let FG = FormGroup;

export class Select extends FormGroup {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FG.defaultProps,
        testAutomationId: "select"
    };

    renderInput() {
        let {children, ...props} = this.getPropsFromContext();
        return <SelectControl {...props} ref="control">{children}</SelectControl>;
    }
}