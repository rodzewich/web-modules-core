import React from "react";
import classnames from "classnames";
import {TabPanel, TabItem} from './TabPanel';
import {Icon} from './Icon';
import {Block} from './Block';

export class WizardNavbar extends React.Component {
    static contextTypes = {
        wizard: React.PropTypes.object.isRequired
    };

    render() {
        var currentStepIndex = this.context.wizard.getCurrentStepIndex();
        var maxVisitedStepIndex = this.context.wizard.getMaxVisitedStepIndex();

        return (
            <Block cancelBottomOffset>
                <TabPanel centered noBorder>
                    {this.context.wizard.getSteps().map((step, index) => {
                        var isPassed = index < currentStepIndex;
                        var isCurrent = index == currentStepIndex;

                        var isBlocked = index > maxVisitedStepIndex;

                        return (
                            <TabItem
                                key={ 'wizardStep-'+step.props.id }
                                testAutomationId={step.props.id}
                                active={isCurrent}
                                disabled={isBlocked}
                                className={classnames({'success': isPassed})}
                                onSelect={() => this.context.wizard.goToStep(step.props.id)}>
                                {isPassed
                                    ? <Icon name="checkbox-selected-readonly"/>
                                    : <strong>{index + 1}</strong>
                                }
                                {step.props.tabText || step.props.title}
                            </TabItem>
                        );
                    })}
                </TabPanel>
            </Block>
        );
    }
}
