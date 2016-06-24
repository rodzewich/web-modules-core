'use strict';

import React from "react";
import {Popup} from "./Popup";
import {Button} from "../Button";
import {Translate} from "../Translate";

export class Alert extends React.Component {
    static defaultProps = {
        title: 'TRANSLATE:ALERT',
        submitText: 'TRANSLATE:OK',
        testAutomationId: 'alert'
    };

    constructor(props, context) {
        super(props, context);

        this.submitAction = this.submitAction.bind(this);
    }

    submitAction() {
        Popup.close();
        if (this.props.submitAction) {
            this.props.submitAction();
        }
    }

    render() {
        var buttons = [
            <Button
                testAutomationId="buttonYes"
                key="buttonYes"
                onClick={this.submitAction}>
                <Translate>
                    {this.props.submitText}
                </Translate>
            </Button>
        ];

        return <Popup {...this.props} bsSize="sm" footer={buttons} onClose={this.submitAction}/>;
    }
}
