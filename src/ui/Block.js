'use strict';

import React from "react";
import classnames from "classnames";

export class Block extends React.Component {
    render() {
        let {
            noOffset,
            addTopOffset,
            cancelTopOffset,
            cancelBottomOffset,
            cancelHorizontalOffset,
            accent,
            condensed,
            className,
            children,
            ...props
            } = this.props;

        let classNames = classnames(className, {
            'rc-block': !cancelBottomOffset && !noOffset,
            'rc-block-addTopOffset': addTopOffset,
            'rc-block-cancelTopOffset': cancelTopOffset,
            'rc-block-cancelBottomOffset': cancelBottomOffset,
            'rc-block-cancelHorizontalOffset': cancelHorizontalOffset,
            'rc-block-accent': accent,
            'rc-block-condensed': condensed
        });
        return (
            <div className={classNames} {...props}>
                {children}
            </div>
        );
    }
}
