'use strict';

import {FormControl} from './FormControl';
import {Checkbox} from './Checkbox';
import {Icon} from '../Icon';
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import _ from 'lodash';
import classnames from 'classnames';

const FC = FormControl;

class MultiSelectOption extends React.Component {
    static contextTypes = {
        multiSelect: React.PropTypes.object,
        multiSelectGroup: React.PropTypes.object
    };

    static propTypes = {
        groupMaster: React.PropTypes.bool
    };

    static compareOptionValue(source) {
        if(_.isObject(source)) {
            return _.matches(source);
        }
        return function(value) {
            return value === source;
        }
    }

    constructor(props, context) {
        super(props, context);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 32: // space
                this.refs.checkbox.click();
                event.preventDefault();
                break;
            default:
                this.props.onKeyDown(event);
        }
    }

    render() {
        var values = this.context.multiSelect.values;
        var isMaster = this.props.groupMaster;
        var isSelected = false;
        var optionValues;

        if (!isMaster) {
            var index = _.findIndex(values, MultiSelectOption.compareOptionValue(this.props.value));
            isSelected = index > -1;

            optionValues = [this.props.value];
        } else {
            var groupValues = this.context.multiSelectGroup.values;
            var selectedValuesCount = 0;

            groupValues.forEach(value => {
                var index = _.findIndex(values, MultiSelectOption.compareOptionValue(value));
                if (index > -1) selectedValuesCount++;
            });

            if (selectedValuesCount > 0) {
                isSelected = selectedValuesCount == groupValues.length ? true : null;
            }

            optionValues = groupValues;
        }

        return (
            <li
                tabIndex="-1"
                data-test-automation-id={this.props.testAutomationId || ("Option" + this.context.multiSelect.uid())}
                onKeyDown={this.handleKeyDown}
                onSelect={this.props.onSelect}
                className={classnames("multi-select-option", this.props.className, {"master-option": isMaster})}>
                <Checkbox
                    ref="checkbox"
                    label={this.props.label}
                    labelClassName={this.props.labelClassName}
                    checked={isSelected}
                    onChange={value => {
                        var isSelected = this.refs.checkbox.getValue();
                        var newValues = values.filter(value => _.findIndex(optionValues,
                                MultiSelectOption.compareOptionValue(value)) == -1);

                        if (isSelected) {
                            newValues = values.concat(optionValues);
                        }

                        this.context.multiSelect.setValues(newValues);
                    }}
                />
            </li>
        );
    }
}

class MultiSelectMasterOption extends React.Component {
    render() {
        return <MultiSelectOption {...this.props} groupMaster/>
    }
}

function getChildrenValues(children) {
    return _.flatten(React.Children.toArray(children)
        .filter(child => {
            return (child.type == MultiSelectOption && !child.props.groupMaster) || child.type == MultiSelectOptionGroup;
        })
        .map(child => {
            if (child.type == MultiSelectOption) {
                return child.props.value;
            } else {
                return getChildrenValues(child.props.children);
            }
        }));
}

class MultiSelectOptionGroup extends React.Component {
    static contextTypes = {
        multiSelectGroup: React.PropTypes.object
    };

    static childContextTypes = {
        multiSelectGroup: React.PropTypes.object
    };

    getChildContext() {
        return {multiSelectGroup: {
            values: getChildrenValues(this.props.children)
        }};
    }

    render() {
        const items = React.Children.toArray(this.props.children).map(child => {
            let childProps = child.props || {};

            return React.cloneElement(child, {
                onKeyDown: this.props.onKeyDown,
                onSelect: this.props.onSelect
            }, childProps.children);
        });

        return (
            <ul className={classnames("multi-select-group", this.props.className)}>
                {items}
            </ul>
        );
    }
}

export class MultiSelect extends FormControl {
    static childContextTypes = {
        multiSelect: React.PropTypes.object
    };

    static Option = MultiSelectOption;
    static MasterOption = MultiSelectMasterOption;
    static Group = MultiSelectOptionGroup;

    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: "multiSelect"
    };

    outputConverter(e) {
        return e;
    }

    getValue(){
        //FIXME Not implemented
        return null;
    }

    getChildContext() {
        var props = this.getPropsFromContext();

        return {multiSelect: {
            uid: () => {
                return ++this.uid;
            },
            values: props.value,
            setValues: props.onChange
        }};
    }

    render() {
        this.uid = 0;

        return (
            <Dropdown
                id={this.props.id}
                onToggle={isOpen => {
                    this.uid = 0;
                }}
                data-test-automation-id={this.props.testAutomationId}
                className={classnames("multi-select", this.props.className, this.props.block ? "btn-block" : '')}>
                <Dropdown.Toggle data-test-automation-id="Toggle" noCaret block>
                    <span className="icon-wrapper">
                        <Icon name="chevron-down-small"/>
                    </span>
                    {this.props.label}
                </Dropdown.Toggle>
                <Dropdown.Menu data-test-automation-id="List">
                    {this.props.children}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
