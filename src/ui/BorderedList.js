'use strict';

import React from "react";
import classnames from "classnames";

export class BorderedListItem extends React.Component {

    render() {
        let {
            active,
            children,
            className,
            ...props
            } = this.props;

        let classNames = classnames("bordered-list-item", className, {
            "active": active
        });

        return (
            <div className={classNames} {...props}>
                {children}
            </div>
        );
    }
}

export class BorderedList extends React.Component {

    render() {
        let {
            noTopBorder,
            noBottomBorder,
            noHorizontalBorders,
            noLeftBorder,
            noRightBorder,
            noVerticalBorders,
            className,
            children,
            ...props
            } = this.props;

        let classNames = classnames("bordered-list", className, {
            'bordered-list-noTopBorder': noTopBorder,
            'bordered-list-noBottomBorder': noBottomBorder,
            'bordered-list-noHorizontalBorders': noHorizontalBorders,
            'bordered-list-noLeftBorder': noLeftBorder,
            'bordered-list-noRightBorder': noRightBorder,
            'bordered-list-noVerticalBorders': noVerticalBorders
        });

        return (
            <div className={classNames} {...props}>
                {children}
            </div>
        );
    }
}
