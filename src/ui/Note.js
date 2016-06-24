'use strict';

import React from "react";
import classnames from "classnames";

export class Note extends React.Component {

    static defaultProps = {
        noteText: 'TRANSLATE:NOTE'
    };

    render() {
        let {
            className,
            children,
            ...props
            } = this.props;

        let classNames = classnames("text-muted", className);

        return (
            <div className={classNames} {...props}>
                {this.props.noteText}: {children}
            </div>
        );
    }
}
