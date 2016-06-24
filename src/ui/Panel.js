'use strict';

import React from "react";
import {default as BSPanel} from "react-bootstrap/lib/Panel";
import classnames from "classnames";

export class Panel extends React.Component {

    static defaultProps = {
        testAutomationId: "panel"
    };

    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        var {className, noPadding, noHeaderPadding, smallHeaderPadding, ...props} = this.props;
        return (
            <BSPanel
                className={classnames({
                    'rc-panel-noPadding': noPadding,
                    'rc-panel-noHeaderPadding': noHeaderPadding,
                    'rc-panel-smallHeaderPadding': smallHeaderPadding //FIXME
                }, className)}
                data-test-automation-id={this.props.testAutomationId}
                {...props}>
                {this.props.children}
            </BSPanel>
        );
    }
}
