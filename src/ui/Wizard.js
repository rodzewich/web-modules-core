import React from "react";

export class Wizard extends React.Component {
    static childContextTypes = {
        wizard: React.PropTypes.object
    };

    getChildContext() {
        return {wizard: this};
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentStepIndex: 0,
            maxVisitedStepIndex: 0,
            errors: {}
        };

        this.setCurrentStepIndex = index => {
            this.setState({
                currentStepIndex: index,
                maxVisitedStepIndex: Math.max(this.state.maxVisitedStepIndex, index)
            });
        };

        this.resetMaxVisitedStepIndex = () => {
            this.setState({maxVisitedStepIndex: 0});
        };

        this.goNext = () => {
            this.validateCurrentStep(() => {
                this.setCurrentStepIndex(this.state.currentStepIndex + 1);
            });
        };

        this.goBack = () => {
            var isValidationNeeded = this.state.currentStepIndex < this.state.maxVisitedStepIndex;
            var prevStepIndex = this.state.currentStepIndex - 1;

            if (isValidationNeeded) {
                this.validateCurrentStep(() => {
                    this.setCurrentStepIndex(prevStepIndex);
                });
            } else {
                this.setCurrentStepIndex(prevStepIndex);
            }
        };

        this.goToStep = id =>   {
            var stepIndex = this.getStepIndexById(id);

            if (stepIndex === -1) {
                throw new Error("Wizard step [" + id + "] is not exists");
            }

            this.validateCurrentStep(() => {
                this.setCurrentStepIndex(stepIndex);
            });
        };

        this.isFirstStep = id => {
            return this.getStepIndexById(id) === 0;
        };

        this.getCurrentStepIndex = () => {
            return this.state.currentStepIndex;
        };

        this.getMaxVisitedStepIndex = () => {
            return this.state.maxVisitedStepIndex;
        };
    }

    getSteps() {
        return [];
    }

    getStepIndexById(id) {
        return this.getSteps().findIndex(step => step.props.id === id);
    }

    validateCurrentStep(onSuccess) {
        var currentStep = this.getSteps()[this.state.currentStepIndex];

        if (currentStep.props.validation) {
            this.setState({errors: {}});

            currentStep.props.validation(this.state)
                .then(status => {
                    onSuccess.call(this);
                })
                .catch(errors => {
                    this.setState({errors: errors});
                });
        } else {
            onSuccess.call(this);
        }
    }

    render() {
        var currentStep = this.getSteps()[this.state.currentStepIndex];

        if (!currentStep) {
            throw new Error("Current wizard step index "
                + this.state.currentStepIndex
                + " is out of ranges - step not found");
        }

        return currentStep;
    }
}
