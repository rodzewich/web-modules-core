'use strict';

import React from 'react';
import {FormControl} from './FormControl';
import {default as BSFormControl} from 'react-bootstrap-datetimepicker';
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

export class DatePickerControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FormControl.defaultProps,
        testAutomationId: 'datePicker'
    };

    render() {
        var props = this.getPropsFromContext();

        return (
                <BSFormControl
                    componentClass='datePicker'
                    {...props}
                />
        );
    }
}
