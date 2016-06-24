'use strict';

import React from 'react';
import {Checkbox} from '../form/Checkbox';

export class ListControlCheckbox extends React.Component {
    static contextTypes = {
        listStore: React.PropTypes.object,
        form: React.PropTypes.object
    };

    static propTypes = {
        dependentFieldName: React.PropTypes.string.isRequired
    };

    getVisibleItems(){
        return this.context.listStore.getPrimaryKeys();
    }

    onChange() {
        var formRecords = this.context.form.value;
        var items = this.getVisibleItems();

        var checked = this.refs.input.getValue();

        var newFormValue = {};
        items.forEach(id => {
            newFormValue[id] = _.extend(
                {},
                formRecords[id],
                {
                    [this.props.dependentFieldName]: checked
                }
            );
        });

        this.context.form.setValue(newFormValue);
    }

    render() {
        var formRecords = this.context.form.value;
        var items = this.getVisibleItems();

        var checkboxValue = false;
        if (items.length > 0) {
            var selectedItems = items.filter(id => formRecords[id] && formRecords[id][this.props.dependentFieldName]);

            if (selectedItems.length == items.length) {
                checkboxValue = true;
            }

            if (selectedItems.length > 0 && selectedItems.length < items.length) {
                checkboxValue = null;
            }
        }

        return <Checkbox
            checked={checkboxValue}
            disabled={items.length == 0}
            onChange={this.onChange.bind(this)}
            ref="input"
            label={this.props.label}
            groupClassName="rc-list-checkbox"
        />;
    }
}