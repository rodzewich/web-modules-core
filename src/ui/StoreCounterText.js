'use strict';

import React from 'react';
import classnames from 'classnames';
import {Translate} from './Translate';

export class StoreCounterText extends React.Component {

    static defaultProps = {
        template: 'TRANSLATE:TOTAL_AMOUNT',
        testAutomationId: 'storeCounterText'
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            counter: this.props.store.getFilteredCount()
        };

        this.onStoreChange = () => {
            this.setState({
                counter: this.props.store.getFilteredCount()
            });
        };
    }
    componentWillReceiveProps( nextProps ) {
        this.props.store.off('change', this.onStoreChange);
        nextProps.store.on('change', this.onStoreChange, this);
    }
    componentDidMount() {
        this.props.store.on('change', this.onStoreChange, this);
    }

    componentWillUnmount() {
        this.props.store.off('change', this.onStoreChange);
    }

    render() {
        var className = classnames('rc-storeCounterText', this.props.className);
        return <span
            data-test-automation-id={this.props.testAutomationId}
            className={className}
            ><Translate totalCount={this.state.counter}>{this.props.template}</Translate></span>;
    }
}