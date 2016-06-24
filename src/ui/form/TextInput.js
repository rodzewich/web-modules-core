'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {TextInputControl} from "./TextInputControl";

let FG = FormGroup;

export class TextInput extends FormGroup {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FG.defaultProps,
        testAutomationId: "textInput",
        maxLength: 64
    };

    renderInput() {
        return <TextInputControl {...this.props} ref="control"/>;
    };
}
