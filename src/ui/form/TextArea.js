'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {TextAreaControl} from "./TextAreaControl";

export class TextArea extends FormGroup {
    renderInput() {
        return <TextAreaControl {...this.props} ref="control" maxLength={this.props.maxLength}/>;
    }
}
