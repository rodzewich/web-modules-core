'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {CheckboxControl} from "./CheckboxControl";

export class Checkbox extends FormGroup {
    controlLabelFallback() {
        return false;
    }
    renderInput() {
        let {label, children, ...props} = this.props;
        return <CheckboxControl {...props} ref="control">{children || label}</CheckboxControl>;
    }
}
