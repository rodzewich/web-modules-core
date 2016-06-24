'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {SelectControl} from "./SelectControl";

export class Select extends FormGroup {

    renderInput() {
        let {children, ...props} = this.getPropsFromContext();
        return <SelectControl {...props} ref="control">{children}</SelectControl>;
    }
}