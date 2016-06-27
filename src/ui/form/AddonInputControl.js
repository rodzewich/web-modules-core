'use strict';

import React from 'react';
import Static from 'react-bootstrap/lib/FormControlStatic';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Button from 'react-bootstrap/lib/Button';
import {default as BSFormControl} from 'react-bootstrap/lib/FormControl';
import {FormControl} from './FormControl';

let FC = FormControl;

export class TextInputControl extends FormControl {

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: 'textInput',
        maxLength: 64
    };

    render() {

        let {type, testAutomationId, ...props} = this.getPropsFromContext();

        type = type || 'text';

        return (
            <InputGroup>
                <BSFormControl type="text" />
                <InputGroup.Button>
                    <Button>Before</Button>
                </InputGroup.Button>
            </InputGroup>
        );

    }
}
