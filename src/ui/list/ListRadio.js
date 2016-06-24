'use strict';

import React from "react";
import {Radio} from '../form/Radio';
import {isSelectedRow} from './utils';

export class ListRadio extends React.Component {

    static contextTypes = {
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

    onChange() {
        //TODO Potential refactor candidate
        if (!this.refs.input.props.checked 
            && !this.props.isDisabled) { //TODO: this is a temperate fix for onchange triggerd of disabled input in IE
            let selectionModel = this.context.listSelectionModel;
            selectionModel.unselect(selectionModel.getSelected());
            selectionModel.select([this.props.record]);
        }
    }

    render() {
        return (
            <Radio
                checked={this.isSelectedRow(this.props.record)}
                onChange={this.onChange}
                ref="input"
                label=" "
                groupClassName="rc-list-radio"
                disabled={ !!this.props.isDisabled }
            />
        );
    }
}
