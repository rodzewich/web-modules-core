import React from "react";
import classnames from "classnames";
import {TextInput} from "./form/TextInput";

export class Filter extends React.Component {

    static defaultProps = {
        testAutomationId: "fieldFilter"
    };

    constructor(props, context) {
        super(props, context);
    }

    handleChange(event) {
        this.props.onChange(this.refs.searchField.getValue());
    }

    render() {
        return (
            <TextInput
                value={this.props.value}
                testAutomationId={ this.props.testAutomationId }
                wrapperClassName={classnames("form-group", "rc-filter", this.props.wrapperClassName)}
                ref="searchField"
                onChange={this.handleChange.bind(this)}
                placeholder={this.props.placeholder}
            />
        );
    }
}
