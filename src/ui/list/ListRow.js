'use strict';

import React from "react";
import {isSelectedRow} from './utils';

export class ListRow extends React.Component {

    static contextTypes = {
        listSelectionModel: React.PropTypes.object,
        listSelectionChecker: React.PropTypes.func
    };

    static defaultProps = {
        testAutomationId: "row"
    };

    static propTypes = {
        record: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (isSelector(e.target)) {
            return;
        }
        let {record, isMultipleSelection} = this.props;
        let {listSelectionModel, listSelectionChecker} = this.context;
        let isSelected = isSelectedRow(listSelectionModel, listSelectionChecker, record);
        listSelectionModel.handleSelection([record], isSelected, isMultipleSelection);
        function isSelector(node) {
            if (node.nodeName.toLocaleLowerCase() === 'tr') {
                return false;
            }
            return node.className.indexOf('rc-list-radio') > -1 || node.className.indexOf('rc-list-checkbox') > -1 || isSelector(node.parentNode);
        }
    }

    render() {
        let {children, isDisabled, testAutomationId, ...props} = this.props;
        if (!isDisabled) {
            props.onClick = this.onClick;
        }
        return (
            <tr data-test-automation-id={testAutomationId} {...props}>
                {children}
            </tr>
        );
    }
}
