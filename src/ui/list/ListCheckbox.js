'use strict';

import React from "react";
import {Checkbox} from '../form/Checkbox';
import {isSelectedRow} from './utils';

export class ListCheckbox extends React.Component {

    static contextTypes = {
        listStore: React.PropTypes.object, //TODO Move to ListHeaderCheckbox
        listSelectionModel: React.PropTypes.object,
        listSelectionChecker: React.PropTypes.func
    };

    static propTypes = {
        record: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
    }

    isSelectedRow(record) {
        return isSelectedRow(
            this.context.listSelectionModel,
            this.context.listSelectionChecker,
            record
        );
    }

    select() {
        this.context.listSelectionModel.select([this.props.record]);
    }

    unselect() {
        this.context.listSelectionModel.unselect([this.props.record]);
    }

    toggle() {
        if (true === this.refs.input.getValue()) {
            this.unselect();
        } else {
            this.select();
        }
    }

    onChange() {
        if (true === this.refs.input.getValue()) {
            this.select();
        } else {
            this.unselect();
        }
    }

    render() {
        return (
            <Checkbox
                checked={this.isSelectedRow(this.props.record)}
                onChange={this.onChange}
                ref="input"
                label="&nbsp;"
                groupClassName="rc-list-checkbox"
            />
        );
    }

}
