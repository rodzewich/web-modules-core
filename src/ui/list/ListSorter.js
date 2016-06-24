'use strict';

import React from "react";
import classnames from "classnames";
import {Icon} from "../Icon";

export const ASC = 'ASC';
export const DESC = 'DESC';

export class ListSorter extends React.Component {

    static contextTypes = {
        listStore: React.PropTypes.object
    };

    static propTypes = {
        property: React.PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let shouldReverse = this.isDirection(ASC);
        this.context.listStore.sortBy(this.props.property, shouldReverse ? DESC : ASC);
    }

    //TODO Move to Store: isDirection(property, direction)
    isDirection(direction) {
        let sorting = this.context.listStore.getSorting();
        return sorting.fieldId === this.props.property && sorting.direction === direction;
    }

    sorterIcon() {
        var iconName;

        if (this.isDirection(ASC)) {
            iconName = "chevron-down-small";
        }

        if (this.isDirection(DESC)) {
            iconName = "chevron-up-small";
        }

        if (iconName) {
            return (
                <Icon name={iconName} className="sorter-icon"/>
            );
        } else {
            return (
                <Icon name="chevron-down-small" className="sorter-icon list-hover-arrow"/>
            );
        }
    }

    sorterClassName() {
        return classnames('sortable', {
            'order-asc': this.isDirection(ASC),
            'order-desc': this.isDirection(DESC)
        });
    }

    render() {
        let {children, ...props} = this.props;

        props.className = classnames(props.className, this.sorterClassName());

        return (
            <div onClick={this.onClick} {...props}>
                {this.sorterIcon()}
                {children}
            </div>
        );
    }

}
