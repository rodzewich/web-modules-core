'use strict';

import React from "react";
import {Popup} from './Popup';
import {Button} from '../Button';
import {Translate} from '../Translate';

export class Confirm extends React.Component {
    static defaultProps = {
        title: 'TRANSLATE:CONFIRMATION',
        submitText: 'TRANSLATE:YES',
        cancelText: 'TRANSLATE:NO',
        testAutomationId: 'confirm'
    };

    static propTypes = {
        submitAction: React.PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.submitAction = this.submitAction.bind(this);
    }

    submitAction() {
        Popup.close();
        this.props.submitAction();
    }

    cancelAction() {
        Popup.close();
        if (typeof this.props.cancelAction === 'function') {
            this.props.cancelAction();
        }
    }

    render() {
        let cancelAction = this.cancelAction.bind(this);
        var buttons = [
            <Button
                testAutomationId="buttonNo"
                onClick={cancelAction}>
                <Translate>
                    {this.props.cancelText}
                </Translate>
            </Button>,

            <Button
                bsStyle="primary"
                testAutomationId="buttonYes"
                onClick={this.submitAction}>
                <Translate>
                    {this.props.submitText}
                </Translate>
            </Button>
        ];
        let props = {onClose: cancelAction, ...this.props};
        return <Popup {...props} bsSize="sm" footer={buttons}/>;
    }
}
