'use strict';

import React from "react";
import classnames from "classnames";
import {default as BSFormGroup} from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import {FormControl} from "./FormControl";

export class FormGroup extends FormControl {

    getValue() {
        return this.refs.control.getValue();
    }

    getInputDOMNode() {
        return this.refs.control.getInputDOMNode();
    }

    controlLabelFallback() {
        return true;
    }

    render() {

        let {
            label,
            validationState,
            bsStyle,
            controlId,
            controlLabel,
            help,
            labelClassName,
            wrapperClassName,
            groupClassName,
            disabled,
            readOnly,
            ...props // properly handle old-style props
        } = this.getPropsFromContext();

        if (!validationState && bsStyle) {
            validationState = bsStyle;
        }

        if (this.constructor.defaultProps.testAutomationId == 'radio' || this.constructor.defaultProps.testAutomationId == 'checkbox') {
            label = null;
        }

        if (!controlLabel && label && this.controlLabelFallback()) {
            controlLabel = label;
        }

        labelClassName = classnames(
            labelClassName,
            (disabled || readOnly) ? "disabled-label" : ""
        );

        let control = (wrapperClassName)
            ? <div className={wrapperClassName}>{this.renderInput()}</div>
            : this.renderInput();

        return (
            <BSFormGroup
                validationState={validationState}
                data-test-automation-id={controlId}
                controlId={controlId}
                className={groupClassName}
                {...props}
            >

                {controlLabel ? <ControlLabel data-test-automation-id="label" className={labelClassName}>
                    {controlLabel}
                </ControlLabel> : null }

                {control}

                {help ? <HelpBlock data-test-automation-id="helpBlock">
                    {help}
                </HelpBlock> : help}

            </BSFormGroup>
        );

    }

    renderInput() {
        return this.props.children;
    }

}
