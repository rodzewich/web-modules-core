'use strict';

import React from "react";
import {FormGroup} from "./FormGroup";
import {TextInputControl} from "./TextInputControl";

export class AddonInput extends FormGroup {
    renderInput() {
        return <TextInputControl {...this.props} ref="control"/>;
    };
}
