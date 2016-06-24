'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {RadioControl} from "./RadioControl";

export class Radio extends FormGroup {
    controlLabelFallback() {
        return false;
    }
    renderInput() {
        let {label, children, ...props} = this.props;
        return <RadioControl {...props} ref="control">{children || label}</RadioControl>;
    }
}
