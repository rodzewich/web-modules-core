'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {TextAreaControl} from "./TextAreaControl";

let FG = FormGroup;

export class TextArea extends FormGroup {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FG.defaultProps,
        testAutomationId: "textInput",
        maxLength: 256
    };

    renderInput() {
        return <TextAreaControl {...this.props} ref="control" maxLength={this.props.maxLength}/>;
    }
}
