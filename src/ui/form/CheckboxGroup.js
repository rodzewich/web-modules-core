'use strict';

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import _ from 'lodash';
import classnames from 'classnames';
import {Checkbox} from './Checkbox';
import {Form} from './Form';
import {Icon} from '../Icon';

export class CheckboxGroup extends Form {
    constructor(props, context) {
        super(props, context);

        this.state = {
            opened: true
        };
    }

    getMainCheckbox() {
        var value = this.getInputValue();
        var selectedCheckboxes = React.Children.toArray(this.props.children)
            .filter(checkbox => value[checkbox.props.name]);

        var mainCheckboxValue = this.calculateMainCheckboxValue({
            selectedCheckboxesCount: selectedCheckboxes.length,
            totalCheckboxesCount: this.props.children.length
        });

        return <Checkbox
            readOnly={this.extractFlatProperty("readOnly")}
            checked={mainCheckboxValue}
            onChange={e => this.onMainCheckboxClick(e.target.checked)}
            label={this.props.title}/>
    }

    calculateMainCheckboxValue({selectedCheckboxesCount, totalCheckboxesCount}) {
        var mainCheckboxValue = null; // indeterminate by default

        if (selectedCheckboxesCount === totalCheckboxesCount) {
            mainCheckboxValue = true;
        }
        if (selectedCheckboxesCount === 0) {
            mainCheckboxValue = false;
        }

        return mainCheckboxValue;
    }

    onMainCheckboxClick(checked) {
        var value = _.extend({}, this.getInputValue());
        var diff = {};

        React.Children.toArray(this.props.children)
            .forEach(checkbox => {
                var id = checkbox.props.name;
                if (id in value) {
                    if (value[id] != checked) {
                        diff[id] = checked;
                    }

                    value[id] = checked;
                }
            });

        this.setOutputValue(value, diff);
    }

    checkboxesPanelToggleHandler() {
        var isOpened = !this.state.opened;

        this.setState({
            opened: isOpened
        });
    }

    render() {
        var checkboxGroupClassNames = classnames("rc-checkbox-group", {
            "opened": this.state.opened,
            "collapsed": !this.state.opened
        });

        var iconName = this.state.opened
            ? "chevron-up-big"
            : "chevron-down-big";

        return (
            <div className={checkboxGroupClassNames} data-test-automation-id={this.props.testAutomationId}>
                <Row className="rc-checkbox-group-header">
                    <Col xs={6}>
                        {this.getMainCheckbox()}
                    </Col>
                    <Col xs={6}
                         className="rc-checkbox-group-icon"
                         onClick={this.checkboxesPanelToggleHandler.bind(this)}>
                        <Icon name={iconName} className="pull-right" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="rc-checkbox-group-body">
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}
