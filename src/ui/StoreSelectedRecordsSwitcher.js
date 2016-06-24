'use strict';

import React from "react";

export const MODE_ALL = 'MODE_ALL';
export const MODE_SELECTED = 'MODE_SELECTED';

/**
 * @deprecated Use SelectedRecordsSwitcher instead
 */
export class StoreSelectedRecordsSwitcher extends React.Component {

    static defaultProps = {
        template: 'TRANSLATE:TOTAL_ITEMS_AMOUNT',
        showAllText: 'TRANSLATE:SHOW_ALL',
        showSelectedText: 'TRANSLATE:SHOW_SELECTED',
        testAutomationId: 'storeSelectedRecordsSwitcher'
    };

    static propTypes = {
        store: React.PropTypes.object.isRequired,
        mode: React.PropTypes.oneOf([MODE_ALL, MODE_SELECTED])
    };

    constructor(props, context) {
        super(props, context);

        var initialMode = this.props.mode || MODE_ALL;

        this.state = {
            mode: initialMode,
            selectedCount: this.props.store.selectionModel.getSelected().length
        };

        if (initialMode === MODE_SELECTED) {
            this.props.store.filterBySelectedItems(true);
        }

        this.onSelectionModelChange = () => {
            this.setState( {
                selectedCount: this.props.store.selectionModel.getSelected().length
            } );
        };
    }

    componentDidMount(){
        this.props.store.selectionModel.on('change', this.onSelectionModelChange, this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mode === MODE_ALL || nextProps.mode === MODE_SELECTED) {
            this.setState({
                mode: nextProps.mode,
                selectedCount: nextProps.store.selectionModel.getSelected().length
            });
        }

        this.props.store.selectionModel.off('change', this.onSelectionModelChange);
        nextProps.store.selectionModel.on('change', this.onSelectionModelChange, this);
    }

    componentWillUnmount(){
        this.props.store.selectionModel.off('change', this.onSelectionModelChange);
    }

    changeMode(nextMode) {
        if (this.state.mode === nextMode) {
            return;
        }
        this.setState({mode: nextMode});
        this.props.store.filterBySelectedItems(nextMode === MODE_SELECTED);

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(nextMode);
        }
    }

    getShowElement( mode ){
        var clickable = this.state.mode !== mode;
        var isModeAll = mode === MODE_ALL;
        var testAutomationId = isModeAll ? 'showAllButton' : 'showSelectedButton"';
        var text =  isModeAll ? this.props.showAllText :
            this.props.showSelectedText + ' (' + this.state.selectedCount + ')';

        return clickable ? (
            <a 
                href='#' 
                onClick={ this.changeMode.bind(this, mode) }
                data-test-automation-id={ testAutomationId }
            >{ text }</a>
        ): (
            <strong className="text-primary" data-test-automation-id={ testAutomationId }> 
                { text }
            </strong>
        );
    }

    render() {
        return (
            <div data-test-automation-id={this.props.testAutomationId} className="store-selected-records-switcher">
                { this.getShowElement(  MODE_ALL ) }
                |
                { this.getShowElement( MODE_SELECTED )}
            </div>
        );
    }
}
