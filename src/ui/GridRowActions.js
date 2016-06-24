'use strict';

import React from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import {Button} from "./Button";

export class GridRowActions extends React.Component {

    static defaultProps = {
        actions: []
    };

    render() {

        var legacyActions = this.props.actions.map((action, i) => {

            return <Button
                bsStyle="link"
                data-test-automation-id={action.testAutomationId}
                onClick={action.onClick}
                key={i}>
                {action.text}
            </Button>

        });

        return (
            <ButtonGroup className="pull-right rc-gridRowActions">
                {legacyActions.concat(this.props.children || [])}
            </ButtonGroup>
        );

    }
}
