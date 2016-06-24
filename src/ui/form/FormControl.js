'use strict';

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

export function isIndeterminate(checked) {
    return (null === checked); // do not supply undefined
}

export class FormControl extends React.Component {

    static contextTypes = {
        form: React.PropTypes.object
    };

    static propTypes = {
        hasFeedbackBlock: React.PropTypes.bool
    };

    static defaultProps = {
        hasFeedbackBlock: true
    };

    getInputDOMNode() {
        return ReactDOM.findDOMNode(this.refs.input);
    }

    focus() {
        var node = this.getInputDOMNode();
        node && node.focus();
    }

    click() {
        var node = this.getInputDOMNode();
        node && node.click();
    }

    getValue() {
        return this.getInputDOMNode().value;
    }

    outputConverter(e) {
        return (e.target ? e.target.value : e);
    }

    inputConverter(value) {
        return {value: value};
    }

    getPropsFromContext() {
        var props = this.props;
        var form = this.context.form;

        if (form && (props.name in form.value)) {
            let errors = form.errors[props.name];
            let showHelpBlock = errors && props.hasFeedbackBlock; //FIXME errors could be an array

            props = _.merge(
                {
                    help: showHelpBlock ? errors : null,
                    bsStyle: errors ? "error" : undefined,
                    readOnly: form.readOnly,
                    onChange: e => form.setValue({[props.name]: this.outputConverter(e)})
                },
                this.inputConverter(form.value[props.name]),
                props
            );
        }

        return props;
    }

}
