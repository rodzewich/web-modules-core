'use strict';

import React from "react";
import _ from "lodash";

import {isSelectedRow, highlight} from './utils';

export class List extends React.Component {

    static defaultProps = {
        noResultsText: 'TRANSLATE:NO_RESULTS',
        blockedText: 'TRANSLATE:PLEASE_WAIT_WHILE_LOADING'
    };

    static childContextTypes = {
        listStore: React.PropTypes.object,
        listSelectionModel: React.PropTypes.object,
        listSelectionChecker: React.PropTypes.func
    };

    static propTypes = {
        noResultsText: React.PropTypes.string, //TODO or object
        blockedText: React.PropTypes.string,
        store: React.PropTypes.object,
        onSelectionChange: React.PropTypes.func,
        selectionChecker: React.PropTypes.func
    };

    getChildContext() {
        return this._context;
    }

    constructor(props, context) {
        super(props, context);

        this.selectionModel = this.props.store.selectionModel;

        this.renderItem = this.renderItem.bind(this);
        this.onStoreChange = this.onStoreChange.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.notifySelectionChange = this.notifySelectionChange.bind(this);

        this.state = {
            rows: this.props.store.getData(),
            selectionDiff: this.selectionModel.getDiff()
        };

        this._context = {
            listStore: this.props.store,
            listSelectionModel: this.selectionModel,
            listSelectionChecker: this.props.selectionChecker
        };
    }

    componentDidMount() {
        this.selectionModel.on('change', this.onSelectionModelChange);
        this.props.store.onChange(this.onStoreChange);
    }

    componentWillUnmount() {
        this.selectionModel.off('change', this.onSelectionModelChange);
        this.props.store.off('change', this.onStoreChange);
    }

    onSelectionModelChange() {
        this.setState({selectionDiff: this.selectionModel.getDiff()}, this.notifySelectionChange);
    }

    onStoreChange(data) {
        this.setState({rows: data});
    }

    isSelectedRow(record) {
        return isSelectedRow(
            this.selectionModel,
            this.props.listSelectionChecker,
            record
        );
    }

    highlight(text) {
        return highlight(this.props.store.textFilterPattern, text);
    }

    //TODO Refactor?
    getDetails() {
        return {
            sortingDirection: this.props.store.getSortingDirection(),
            highlight: this.highlight.bind(this)
        };
    }

    notifySelectionChange() {
        if (_.isFunction(this.props.onSelectionChange)) {
            this.props.onSelectionChange(this.selectionModel);
        }
    }

    hasItems() {
        return this.props.store.getFilteredCount() > 0;
    }

    rowClickHandler(fn) {
        return (event) => {
            var isInsideStopper = false;
            var currentNode = event.target;
            var rootNode = event.currentTarget;
            var stopperAttribute;

            while (currentNode && currentNode !== rootNode) {
                stopperAttribute = currentNode.dataset
                    ? currentNode.dataset.stopRowClick
                    : currentNode.getAttribute('data-stop-row-click'); // for IE <= 10

                isInsideStopper = stopperAttribute == 'true';
                if (isInsideStopper) {
                    break;
                } else {
                    currentNode = currentNode.parentNode;
                }
            }

            if (isInsideStopper) {
                event.stopPropagation();
            } else {
                fn(event);
            }
        };
    }

    renderEmpty() {
        return this.props.noResultsText;
    }

    renderEmptyListMessage() {
        if (!this.hasItems()) {
            return (
                <div className="grid-empty-list-message" data-test-automation-id="noResultsMessage">
                    {this.props.noResultsText}
                </div>
            );
        }
    }

    renderBlockedMessage() {
        if (this.props.isBlocked) {
            return (
                <div className="grid-blocked-list-container">
                    <div className="grid-blocked-list-message">
                        {this.props.blockedText}
                    </div>
                </div>
            );
        }
    }

    renderItems() {
        return this.state.rows.map(this.renderItem);
    }

    renderItem(record) {
        return null;
    }

    render() {
        return this.hasItems() ? this.renderItems() : this.renderEmpty();
    }
}
