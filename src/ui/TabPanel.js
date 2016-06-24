'use strict';

import React from "react";
import classnames from "classnames";
import {LinkContainer} from "react-router-bootstrap";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";

export class TabItem extends React.Component {
    render() {
        if (this.props.to) {
            return (
                <LinkContainer {...this.props}>
                    <NavItem data-test-automation-id={this.props.testAutomationId}>
                        {this.props.children}
                    </NavItem>
                </LinkContainer>
            );
        } else {
            return (
                <NavItem {...this.props} data-test-automation-id={this.props.testAutomationId}>
                    {this.props.children}
                </NavItem>
            );
        }
    }
}

export class TabPanel extends React.Component {
    render() {
        let className = classnames({
            'rc-nav-centered': this.props.centered,
            'rc-nav-noBorder': this.props.noBorder
        }, this.props.className);
        return (
            <Nav
                bsStyle="tabs"
                className={ className }
                data-test-automation-id="tabs"
                { ...this.props }>
                {this.props.children}
            </Nav>
        );
    }
}
