'use strict';

import React from "react";
import classnames from "classnames";
import {ListSorter} from "./ListSorter";

export class GridSorter extends ListSorter {

    render() {
        let {children, ...props} = this.props;

        props.className = classnames(props.className, this.sorterClassName());

        return (
            <th onClick={this.onClick} {...props}>
                {this.sorterIcon()}
                <div className="grid-header-text">
                    {children}
                </div>
            </th>
        );
    }
}
