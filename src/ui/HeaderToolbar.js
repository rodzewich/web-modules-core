'use strict';

import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/Nav';
import Nav from 'react-bootstrap/lib/NavItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import _ from 'lodash';
import {Icon} from "./Icon";
import {Button} from "./Button";
import {translate} from "../utils/functions";

export class HeaderToolbar extends React.Component {

    static get contextTypes() {
        return {
            history: React.PropTypes.object,
            buttonCol: React.PropTypes.number
        };
    }

    static defaultProps = {
        testAutomationId: 'headerToolbar',
        backButtonTestAutomationId: 'buttonBack',
        title: '',
        buttonCol: 2,
        backText: 'TRANSLATE:BACK'
    };

    handleBackIconClick() {
        var history = this.context.history;

        var handleHistory = true;
        if (_.isFunction(this.props.onBackButtonClick)) {
            handleHistory = this.props.onBackButtonClick();
        }

        if (handleHistory === false) {
            return;
        }

        if (this.props.backLink) {
            history.pushState(null, this.props.backLink);
        } else {
            history.goBack();
        }
    }

    render() {
        var buttonCol = this.props.buttonCol;
        var textCol = 12 - (buttonCol * 2);

        return (
            <Navbar className="header-toolbar" fluid>
                <Row>
                    <Col xs={buttonCol}>
                        <Navbar.Form pullLeft>
                            <Button bsStyle="link" onClick={this.handleBackIconClick.bind(this)}
                                    data-test-automation-id={ this.props.backButtonTestAutomationId }>
                                <Icon name="chevron-left-big" className="back-icon"/>
                                {translate(this.props.backText)}
                            </Button>
                        </Navbar.Form>
                    </Col>
                    <Col xs={textCol}>
                        <Navbar.Header>
                            <Navbar.Brand data-test-automation-id="title">{this.props.title}</Navbar.Brand>
                        </Navbar.Header>
                    </Col>
                    <Col xsOffset={8}>
                        {this.props.children}
                    </Col>
                </Row>
            </Navbar>
        );
    }
}
