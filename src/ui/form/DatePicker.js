'use strict';

import React from 'react';
import {FormGroup} from './FormGroup';
import {DatePickerControl} from './DatePickerControl';

export class DatePicker extends FormGroup {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FormGroup.defaultProps,
        testAutomationId: 'datePicker'
    };

    renderInput() {
        return <div><DatePickerControl {...this.props} /></div>;
    }
}
