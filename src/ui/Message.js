'use strict';

import React from 'react';
import classnames from 'classnames';

export class Message extends React.Component {

    static defaultProps = {
        testAutomationId: "message"
    };

    render() {

        var classNames = classnames({
            "text-danger": (this.props.messageType === "danger"),
            "text-warning": (this.props.messageType === "warning"),
            "text-success": (this.props.messageType === "success"),
            "text-default": (this.props.messageType === "default")
        });

        return(
            <span className={classNames} data-test-automation-id={this.props.testAutomationId}>
                {this.props.children}
            </span>
        )
    }
}
