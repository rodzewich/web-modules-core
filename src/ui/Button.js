'use strict';

import React from "react";
import {default as Btn} from "react-bootstrap/lib/Button";
import classnames from "classnames";

export class Button extends React.Component {
    static defaultProps = {
        testAutomationId: "button"
    };

    render() {
        let {
            withIcon,
            iconOnly,
            className,
            children,
            ...props
        } = this.props;

        let classNames = classnames(className, {
            'rc-button-icon-only': iconOnly,
            'rc-button-with-icon': withIcon
        });

        return (
            <Btn
                data-test-automation-id={props.testAutomationId}
                {...props}
                className={classNames}>
                {children}
            </Btn>
        );
    }
}
