'use strict';

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import _ from 'lodash';

export class CollapsibleList extends React.Component {

    static defaultProps = {
        testAutomationId: "collapsibleList",
        visibleItems: 1
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isCollapsed: true
        };
    }

    handleToggleClick() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    render() {
        var head = _.take(this.props.children, this.props.visibleItems);
        var tail = _.takeRight(this.props.children, this.props.children.length - this.props.visibleItems);
        var showToggle = tail.length > 0;
        var toggle;

        if (showToggle) {
            toggle = <span className="toggle-list" onClick={this.handleToggleClick.bind(this)}>...</span>
        }

        return (
            <div
                className="collapsible-list"
                data-test-automation-id={this.props.testAutomationId}>

                <div className="head-wrapper">{head}</div>
                {toggle}
                <Collapse in={!this.state.isCollapsed}>
                    <div>{tail}</div>
                </Collapse>
            </div>
        );
    }
}
