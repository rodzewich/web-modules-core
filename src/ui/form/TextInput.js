'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {TextInputControl} from "./TextInputControl";

export class TextInput extends FormGroup {
    renderInput() {
        return <TextInputControl {...this.props} ref="control"/>;
    };
}
