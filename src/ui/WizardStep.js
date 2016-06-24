import React from "react";
import {Popup} from "./popups/Popup";
import {Button} from "./Button";
import {Block} from "./Block";
import {WizardNavbar} from "./WizardNavbar";
import {translate} from "../utils/functions";

export class WizardStep extends React.Component {
    static contextTypes = {
        wizard: React.PropTypes.object.isRequired
    };

    static propTypes = {
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        tabText: React.PropTypes.string,
        validation: React.PropTypes.func,
        testAutomationId: React.PropTypes.string
    };

    static defaultProps = {
        bsSize: "large",
        testAutomationId: "wizardstep",
        backText: 'TRANSLATE:BACK',
        cancelText: 'TRANSLATE:CANCEL',
        next: 'TRANSLATE:NEXT'
    };

    getDefaultButtons(footerConfig = {}) {
        var left;
        var right;
        footerConfig = {
            ...this.props.footerConfig,
            ...footerConfig
        };

        if (!this.context.wizard.isFirstStep(this.props.id)) {
            left = (
                <Button onClick={this.context.wizard.goBack} testAutomationId="cancelButton" key="cancelButton">
                    {translate(this.props.backText)}
                </Button>
            );
        } else {
            left = (
                <Button onClick={Popup.close} testAutomationId="backButton" key="backButton">
                    {translate(this.props.cancelText)}
                </Button>
            );
        }

        right = (
            <Button onClick={this.context.wizard.goNext} disabled={ footerConfig.rightBtnDisabled } bsStyle="primary" testAutomationId="nextButton" key="nextButton">
                {translate(this.props.nextText)}
            </Button>
        );

        return [left, right];
    }

    getDefaultNavbar() {
        return <WizardNavbar/>;
    }

    getFooter() {
        return this.props.footer || this.getDefaultButtons();
    }

    getHeader() {
        return this.props.header || this.getDefaultNavbar();
    }

    render() {
        return (
            <Popup
                noPadding={this.props.noPadding}
                noBottomPadding={this.props.noBottomPadding}
                onClose={this.props.onClose}
                bsSize={this.props.bsSize}
                title={<Block>{this.props.title}</Block>}
                header={this.getHeader()}
                testAutomationId={this.props.testAutomationId}
                footer={this.getFooter()}>
                {this.props.children}
            </Popup>
        );
    }
}
