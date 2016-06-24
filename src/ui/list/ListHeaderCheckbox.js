'use strict';

import React from "react";
import {Checkbox} from '../form/Checkbox';
import {ListCheckbox} from './ListCheckbox';

export class ListHeaderCheckbox extends ListCheckbox {

    getData(){
        return this.context.listStore.getData();
    }

    //TODO Simplify
    onChange() {
        var checked = this.refs.input.getValue();
        // split visible rows into selected/unselected
        var selection = _.reduce(
            this.getData(),
            (acc, record) => {
                if (this.isSelectedRow(record)) {
                    acc.selected.push(record);
                } else {
                    acc.unselected.push(record);
                }
                return acc;
            },
            {selected: [], unselected: []}
        );

        if (true === checked) {
            this.context.listSelectionModel.select(selection.unselected);
        } else {
            this.context.listSelectionModel.unselect(selection.selected);
        }
    }

    getVisibleSelected() {
        return _
            .filter(this.getData(), (record) => {
                return this.isSelectedRow(record);
            });
    }

    render() {
        let data = this.getData();
        let visibleSelectedKeys = this.getVisibleSelected();
        let isVisibleRowsHasSelection = visibleSelectedKeys.length > 0;
        let isAllVisibleRowsSelected = visibleSelectedKeys.length === data.length;

        let checkboxValue = false;

        if (data.length > 0) {
            checkboxValue = isAllVisibleRowsSelected;

            if (!isAllVisibleRowsSelected && isVisibleRowsHasSelection) {
                checkboxValue = null;
            }
        }

        return <Checkbox
            checked={checkboxValue}
            disabled={data.length == 0}
            onChange={this.onChange}
            ref="input"
            label={ this.props.label || ' '}
            groupClassName="rc-list-checkbox"
        />;
    }

}
