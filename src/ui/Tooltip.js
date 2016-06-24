'use strict';

import React from 'react';
import classnames from 'classnames';
import {default as BSTooltip} from 'react-bootstrap/lib/Tooltip';

export class Tooltip extends React.Component {
    render() {
        var {children, className, ...props} = this.props;
        return (
            <BSTooltip
                className={classnames(className, "bootstrap-rc")}
                {...props}>
                {children}
            </BSTooltip>
        );
    }
}