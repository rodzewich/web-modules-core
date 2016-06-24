'use strict';

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

export class Form extends React.Component {
    static childContextTypes = {
        form: React.PropTypes.object
    };

    static contextTypes = {
        form: React.PropTypes.object
    };

    static defaultProps = {
        testAutomationId: 'form',
        noContainer: false
    };

    getChildContext() {
        return {form: {
            readOnly: this.extractFlatProperty('readOnly'),
            value: this.getInputValue(),
            errors: this.extractProperty('errors'),
            setValue: this.setValue
        }};
    }

    constructor(props, context) {
        super(props, context);
        this.setValue = this.setOutputValue.bind(this);
    }

    setOutputValue(value, diff = value) {
        value = this.outputConverter(_.extend({}, this.getInputValue(), value), diff);

        if (this.props.onChange) {
            this.props.onChange(value, diff);
        } else if (this.props.name && this.context.form) {
            this.context.form.setValue(
                {[this.props.name]: value},
                {[this.props.name]: diff}
            );
        }
    }

    getInputValue() {
        return this.inputConverter(this.extractProperty('value'));
    }

    inputConverter(value) {
        return this.props.inputConverter
            ? this.props.inputConverter.call(this, value)
            : value;
    }

    outputConverter(value, diff) {
        return this.props.outputConverter
            ? this.props.outputConverter.call(this, value, diff)
            : value;
    }

    extractProperty(propName) {
        var value = this.props[propName],
            form = this.context.form;

        if (form && value === undefined) {
            value = form[propName][this.props.name];
        }

        return value || {};
    }

    extractFlatProperty(propName) {
        var value = this.props[propName],
            form = this.context.form;

        if (form && value === undefined) {
            value = form[propName];
        }

        return value;
    }

    render() {
        if (this.props.noContainer) {
            return this.props.children;
        }

        return (
            <div
                data-test-automation-id={this.props.testAutomationId}
                className={classnames("rc-form", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}
