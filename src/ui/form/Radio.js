'use strict';

import React from 'react';
import {FormGroup} from './FormGroup';
import {RadioControl} from './RadioControl';

let FG = FormGroup;

export class Radio extends FormGroup {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FG.defaultProps,
        testAutomationId: 'radio'
    };

    renderInput() {
        let {label, children, ...props} = this.props;
        return <RadioControl {...props} ref="control">{children || label}</RadioControl>;
    }
}
